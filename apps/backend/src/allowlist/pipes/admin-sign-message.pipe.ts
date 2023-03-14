import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { StdSignature } from 'cudosjs';
import { SignedMessageDto } from '../dto/signed-message.dto';
import { isValidSignature } from '../../common/utils';
import { AllowlistService } from '../allowlist.service';

@Injectable()
export class AdminSignMessagePipe implements PipeTransform {
  constructor(
    private allowlistService: AllowlistService,
    private readonly context: ExecutionContext
  ) { }
  async transform(signedData: SignedMessageDto, metadata: ArgumentMetadata) {

    const request = this.context.switchToHttp().getRequest()
    const { session } = request;

    if (!signedData.signature) {
      throw new BadRequestException('Missing signature');
    }

    if (!signedData.connectedAddress) {
      throw new BadRequestException('Missing address');
    }

    if (!signedData.message) {
      throw new BadRequestException('Missing message');
    }

    // If we reach here, we are guarantied by the "IsAdminGuard" that we have a valid session.user.address
    // and is confirmed as admin against an existing allowlist with the ID from the request
    // We only have to compare this is the same address to the one coming with the signed data.
    if (signedData.connectedAddress !== session.user.address) {
      throw new UnauthorizedException('Invalid admin');
    }

    let validSignature;
    try {
      validSignature = isValidSignature(
        signedData.signature as StdSignature,
        signedData.connectedAddress,
        signedData.message
      )

    } catch (error) {
      console.log(error);
      throw error;
    }

    if (!validSignature) {
      throw new BadRequestException('Invalid signature');
    }

    return signedData;
  }
}

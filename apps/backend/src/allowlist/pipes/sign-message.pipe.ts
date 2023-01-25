import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { StdSignature, verifyNonceMsgSigner } from 'cudosjs';
import { SignedMessageDto } from '../dto/signed-message.dto';

@Injectable()
export class SignMessagePipe implements PipeTransform {
  async transform(value: SignedMessageDto, metadata: ArgumentMetadata) {
    if (!value.signature) {
      throw new BadRequestException('Missing signature');
    }

    if (!value.connectedAddress) {
      throw new BadRequestException('Missing address');
    }

    if (!value.message) {
      throw new BadRequestException('Missing message');
    }

    if (!(value.sequence > -1)) {
      throw new BadRequestException('Missing sequence');
    }

    if (!value.account_number) {
      throw new BadRequestException('Missing account number');
    }

    if (!value.chain_id) {
      throw new BadRequestException('Missing chain id');
    }
    
    let validSignature;
    try {
      validSignature = await verifyNonceMsgSigner(
        value.signature as StdSignature,
        value.connectedAddress,
        value.message,
        value.sequence,
        value.account_number,
        value.chain_id,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }

    if (!validSignature) {
      throw new BadRequestException('Invalid signature');
    }

    return value;
  }
}

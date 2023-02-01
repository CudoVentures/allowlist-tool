import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { StdSignature } from 'cudosjs';
import { SignedMessageDto } from '../dto/signed-message.dto';
import { isValidSignature } from '../../common/utils';

@Injectable()
export class AdminSignMessagePipe implements PipeTransform {
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

    let validSignature;
    try {
      validSignature = isValidSignature(
        value.signature as StdSignature,
        value.connectedAddress,
        value.message
      )

    } catch (error) {
      console.log(error);
      throw error;
    }

    if (!validSignature) {
      throw new BadRequestException('Invalid signature');
    }
    console.log("Admin check")
    return value;
  }
}

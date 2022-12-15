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
    if (
      !(await verifyNonceMsgSigner(
        value.signature as StdSignature,
        value.address,
        value.message,
        value.sequence,
        value.account_number,
        value.chain_id,
      ))
    ) {
      throw new BadRequestException('Invalid signature');
    }
    return value;
  }
}

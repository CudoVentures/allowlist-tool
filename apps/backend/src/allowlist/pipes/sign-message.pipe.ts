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
      !value.signature ||
      !value.address ||
      !value.message ||
      !value.sequence ||
      !value.account_number ||
      !value.chain_id
    ) {
      throw new BadRequestException('Missing data');
    }

    const val = {};
    Object.keys(value).forEach((key) => {
      if (key === 'sqeuence' || key === 'account_number') {
        val[key] = +value[key];
      } else if (key === 'signature') {
        val[key] = JSON.parse(value[key] as string);
      } else {
        val[key] = value[key];
      }
    });

    let validSignature;
    try {
      validSignature = await verifyNonceMsgSigner(
        val['signature'] as StdSignature,
        val['address'],
        val['message'],
        val['sequence'],
        val['account_number'],
        val['chain_id'],
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

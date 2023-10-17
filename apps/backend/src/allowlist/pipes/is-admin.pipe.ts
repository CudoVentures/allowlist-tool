import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { StdSignature } from 'cudosjs';
import { isValidSignature } from '../../common/utils';
import { SignedMessageDto } from '../dto/signed-message.dto';

@Injectable()
export class IsAdminPipe implements PipeTransform {
    async transform(value: SignedMessageDto, _metadata: ArgumentMetadata) {
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
        value.message,
            )
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

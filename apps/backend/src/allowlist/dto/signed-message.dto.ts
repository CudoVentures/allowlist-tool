import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
} from 'class-validator';
import { StdSignature } from 'cudosjs';

export class SignedMessageDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    @ApiProperty()
        signature: StdSignature;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
        message: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
        connectedAddress: string;
}

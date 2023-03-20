import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

class SignatureDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  pub_key: Object;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  type: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  signature: string;
}

export class SignedMessageDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @ApiProperty()
  signature: Object;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  message: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  connectedAddress: string;
}

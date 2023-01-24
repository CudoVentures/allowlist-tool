import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsNumber,
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
  signature: SignatureDto;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  sequence: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  account_number: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  chain_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  message: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  connectedAddress: string;
}

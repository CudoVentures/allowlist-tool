import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsNumber,
} from 'class-validator';

export class SignedMessageDto {
  @IsObject()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  @ApiProperty()
  signature: Object;

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
  address: string;
}

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
  @IsOptional()
  @ApiProperty()
  signature: Object;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  sequence: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  account_number: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  chain_id: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  message: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  address: string;
}

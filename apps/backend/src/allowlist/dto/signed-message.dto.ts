import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class SignedMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  signature: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  address: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  nonce: number;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  sequence: number;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  accountNumber: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  chainId: string;
}

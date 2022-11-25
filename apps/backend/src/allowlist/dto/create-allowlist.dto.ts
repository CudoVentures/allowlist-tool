import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumberString,
} from 'class-validator';
import { SignedMessageDto } from './signed-message.dto';

export class CreateAllowlistDto extends SignedMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  twitter_account?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  tweet?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  discord_server?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  server_role?: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: true })
  project_chain_id: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  end_date: Date;
}

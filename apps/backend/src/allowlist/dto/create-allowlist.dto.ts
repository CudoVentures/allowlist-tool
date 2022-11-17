import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumberString,
} from 'class-validator';

export class CreateAllowlistDto {
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

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  tweetId?: number;

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
  chainId: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  end_date: Date;
}

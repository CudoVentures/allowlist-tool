import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';
import { SignedMessageDto } from './signed-message.dto';

export class UpdateAllowlistDto extends SignedMessageDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  url: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  cosmos_chain_id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  website: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  twitter_account: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  discord_url: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  end_date: string;
}

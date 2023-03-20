import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { SignedMessageDto } from './signed-message.dto';

export class CreateAllowlistDto extends SignedMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  cosmos_chain_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  website: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  twitter_account: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  discord_url: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  end_date: Date;


  @IsNotEmpty()
  @ApiProperty({ required: true })
  image: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  banner_image: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  twitter_account_to_follow: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  tweet_to_like: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  tweet_to_retweet: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  discord_invite_link: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  server_role: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  require_email: boolean;
}

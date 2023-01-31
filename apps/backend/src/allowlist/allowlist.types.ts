import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class AllowlistJSONValidator {
  @IsNumber()
  id: number;

  @IsString()
  admin: string;

  @IsArray()
  @IsString({ each: true })
  users: string[];

  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  cosmos_chain_id: string;

  @IsString()
  website: string;

  @IsString()
  twitter_account: string;

  @IsString()
  discord_url: string;

  @IsDateString()
  end_date: Date;

  @IsString()
  image: string;

  @IsString()
  banner_image: string;

  @IsString()
  @IsOptional()
  twitter_account_to_follow: string;

  @IsString()
  @IsOptional()
  tweet_to_like: string;

  @IsString()
  @IsOptional()
  tweet_to_retweet: string;

  @IsString()
  @IsOptional()
  discord_invite_link: string;

  @IsString()
  @IsOptional()
  server_role: string;

  @IsBoolean()
  @IsOptional()
  require_email: boolean;
}

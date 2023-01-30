import { IsNotEmpty, IsString } from 'class-validator';

export class UserJSONValidator {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsString()
  twitter_profile_id: string;

  @IsString()
  discord_profile_id: string;
}

export class TwitterUserJSONValidator {

  @IsNotEmpty()
  @IsString()
  twitter_profile_id: string;

  @IsString()
  twitter_profile_username: string;

  @IsString()
  twitter_access_token: string;

  @IsString()
  twitter_refresh_token : string;
}


export class DiscordUserJSONValidator {

  @IsNotEmpty()
  @IsString()
  discord_profile_id: string;

  @IsString()
  discord_profile_username: string;

  @IsString()
  discord_access_token: string;

  @IsString()
  discord_refresh_token: string;
}

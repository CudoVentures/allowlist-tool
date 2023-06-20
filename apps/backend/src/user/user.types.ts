import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserJSONValidator {
  @IsNumber()
      id: number;

  @IsString()
      address: string;

  @IsEmail()
  @IsString()
      email: string;

  @IsString()
      twitter_profile_id: string;

  @IsString()
      twitter_profile_username: string;

  @IsString()
      twitter_access_token: string;

  @IsString()
      twitter_refresh_token: string;

  @IsString()
      discord_profile_id: string;

  @IsString()
      discord_profile_username: string;

  @IsString()
      discord_access_token: string;

  @IsString()
      discord_refresh_token: string;
}

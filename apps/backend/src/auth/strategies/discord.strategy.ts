import { Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.model';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.App_Discord_Client_ID,
      clientSecret: process.env.App_Discord_Client_Secret,
      callbackURL: process.env.App_Auth_Callback_Url,
      scope: ['identify', 'email', 'guilds', 'guilds.members.read', 'bot'],
    });
  }

  async validate(accessToken, refreshToken, profile): Promise<User> {
    const user = await this.authService.validateUser({
      discord_access_token: accessToken,
      discord_refresh_token: refreshToken,
      discord_profile_id: profile.id,
      discord_profile_username: `${profile.username}#${profile.discriminator}`,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

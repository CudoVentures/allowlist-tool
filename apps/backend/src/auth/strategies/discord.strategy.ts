import { Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.model';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.APP_DISCORD_CLIENT_ID,
      clientSecret: process.env.App_Discord_Client_Secret,
      callbackURL: process.env.App_Auth_Callback_Url,
      scope: ['identify', 'email', 'guilds', 'guilds.members.read'],
      passReqToCallback: true,
    });
  }

  async validate(req, accessToken, refreshToken, profile): Promise<User> {
    const user = await this.authService.validateDiscordUser(
      req,
      accessToken,
      refreshToken,
      profile,
    );

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}

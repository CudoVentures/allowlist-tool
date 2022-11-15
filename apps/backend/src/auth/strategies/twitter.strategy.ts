import { Strategy } from '@superfaceai/passport-twitter-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.model';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private readonly authService: AuthService) {
    const clientID = process.env.App_Twitter_Client_ID;
    const clientSecret = process.env.App_Twitter_Client_Secret;
    super({
      clientID,
      clientSecret,
      callbackURL: process.env.App_Twitter_Callback_Url,
      scope: ['users.read', 'tweet.read', 'offline.access'],
      customHeaders: {
        Authorization:
          'Basic ' +
          Buffer.from(`${clientID}:${clientSecret}`).toString('base64'),
      },
    });
  }

  async validate(accessToken, refreshToken, profile): Promise<User> {
    const user = await this.authService.validateUser(
      accessToken,
      refreshToken,
      profile,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

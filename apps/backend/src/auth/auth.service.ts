import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateDiscordUser(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<User> {
    const data = {};
    data['discord_access_token'] = accessToken;
    data['discord_refresh_token'] = refreshToken;
    data['discord_profile_id'] = profile.id;
    data[
      'discord_profile_username'
    ] = `${profile.username}#${profile.discriminator}`;

    const address = req.session.user.address;
    let user = await this.usersService.findByAddress(address);

    if (!user) {
      return this.usersService.create({ ...data, address });
    }

    return this.usersService.update(user.id, data);
  }

  async validateTwitterUser(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<User> {
    const data = {};
    data['twitter_access_token'] = accessToken;
    data['twitter_refresh_token'] = refreshToken;
    data['twitter_profile_id'] = profile.id;
    data['twitter_profile_username'] = profile.username;

    const address = req.session.user.address;
    let user = await this.usersService.findByAddress(address);

    if (!user) {
      return this.usersService.create({ ...data, address });
    }

    return this.usersService.update(user.id, data);
  }
}

import { Injectable } from '@nestjs/common';
import UserEntity from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async login(address: string): Promise<UserEntity> {
    const user = await this.usersService.findByAddress(address);

    if (!user) {
      return this.usersService.createUser({ address });
    }

    return user;
  }

  async validateDiscordUser(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<UserEntity> {
    const data = {};
    data['discord_access_token'] = accessToken;
    data['discord_refresh_token'] = refreshToken;
    data['discord_profile_id'] = profile.id;
    data[
      'discord_profile_username'
    ] = `${profile.username}#${profile.discriminator}`;

    let user = await this.usersService.findByAddress(req.session.user.address);
    return this.usersService.updateUser(user.id, data);
  }

  async validateTwitterUser(
    req: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<UserEntity> {
    const data = {};
    data['twitter_access_token'] = accessToken;
    data['twitter_refresh_token'] = refreshToken;
    data['twitter_profile_id'] = profile.id;
    data['twitter_profile_username'] = profile.username;

    let user = await this.usersService.findByAddress(req.session.user.address);
    return this.usersService.updateUser(user.id, data);
  }
}

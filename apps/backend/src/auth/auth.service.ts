import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(
    accessToken: string,
    tokenSecret: string,
    profile: any,
  ): Promise<any> {
    let user = await this.usersService.findOne(profile.id);

    if (!user) {
      user = await this.usersService.create(profile.id, accessToken, '0x0');
    }

    return user;
  }
}

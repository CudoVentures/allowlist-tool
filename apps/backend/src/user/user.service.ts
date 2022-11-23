import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByAddress(address: string): Promise<User> {
    return this.userModel.findOne({ where: { address } });
  }

  async create(params: any): Promise<User> {
    const user = this.userModel.create({
      ...params,
    });
    return user;
  }

  async update(address: string, params: any): Promise<User> {
    const [count, [user]] = await this.userModel.update(
      {
        ...params,
      },
      {
        where: { address },
        returning: true,
      },
    );
    return user;
  }

  async clearSession(address: string): Promise<User> {
    const [count, [user]] = await this.userModel.update(
      {
        twitter_access_token: null,
        twitter_profile_id: null,
        twitter_profile_username: null,
        twitter_refresh_token: null,
        discord_access_token: null,
        discord_profile_id: null,
        discord_profile_username: null,
        discord_refresh_token: null,
      },
      {
        where: { address },
        returning: true,
      },
    );
    return user;
  }
}

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

  async findByDiscordId(id: number): Promise<User> {
    return this.userModel.findOne({ where: { discord_profile_id: id } });
  }

  async findByTwitterId(id: number): Promise<User> {
    return this.userModel.findOne({ where: { twitter_profile_id: id } });
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async createUser(params: any): Promise<User> {
    return this.userModel.create({
      ...params,
    });
  }

  async updateUser(id: number, params: any): Promise<User> {
    const [count, [user]] = await this.userModel.update(
      {
        ...params,
      },
      {
        where: { id },
        returning: true,
      },
    );
    return user;
  }
}

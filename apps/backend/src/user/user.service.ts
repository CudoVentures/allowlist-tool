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

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async create(params: any): Promise<User> {
    const user = this.userModel.create({
      ...params,
    });
    return user;
  }

  async update(id: number, params: any): Promise<User> {
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

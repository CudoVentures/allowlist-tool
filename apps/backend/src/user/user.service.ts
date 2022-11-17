import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOne(profileId: string): Promise<User> {
    const user = this.userModel.findOne({ where: { profile_id: profileId } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(
    id: string,
    accessToken: string,
    refreshToken: string,
    address: string,
  ): Promise<User> {
    const user = this.userModel.create({
      profile_id: id,
      access_token: accessToken,
      refresh_token: refreshToken,
      address,
    });
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import TwitterUserEntity from './entities/twitter_user.entity';
import UserEntity from './entities/user.entity';
import { TwitterUserRepo } from './repos/twitter_user.repo';
import { UserRepo } from './repos/user.repo';
import { DiscordUserRepo } from './repos/discord_user.repo';
import DiscordUserEntity from './entities/discord_user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserRepo)
    private userRepo: typeof UserRepo,
    @InjectModel(TwitterUserRepo)
    private twitterRepo: typeof TwitterUserRepo,
    @InjectModel(DiscordUserRepo)
    private discorddRepo: typeof DiscordUserRepo
  ) {}

  async findByAddress(address: string): Promise<UserEntity> {
    const userRepo = await this.userRepo.findOne({ where: { address } });
    return UserEntity.fromRepo(userRepo);
  }

  async findByDiscordId(id: number): Promise<DiscordUserEntity> {
    const userRepo = await this.discorddRepo.findOne({
      where: { discord_profile_id: id },
    });
    return DiscordUserEntity.fromRepo(userRepo);
  }

  async findByTwitterId(id: number): Promise<TwitterUserEntity> {
    const userRepo = await this.twitterRepo.findOne({
      where: { twitter_profile_id: id },
    });
    return TwitterUserEntity.fromRepo(userRepo);
  }

  async createUser(params: any): Promise<UserEntity> {
    const userRepo = await this.userRepo.create({
      ...params,
    });
    return UserEntity.fromRepo(userRepo);
  }

  async createTwitterUser(params: any): Promise<TwitterUserEntity> {
    const userRepo = await this.twitterRepo.create({
      ...params,
    });
    return TwitterUserEntity.fromRepo(userRepo);
  }

  async updateUser(address: string, params: any): Promise<UserEntity> {
    const [count, [userRepo]] = await this.userRepo.update(
      {
        ...params,
      },
      {
        where: { address },
        returning: true,
      },
    );
    return UserEntity.fromRepo(userRepo);
  }

  async updateTwitterUser(twitter_profile_id: string, params: any): Promise<TwitterUserEntity> {
    const [count, [userRepo]] = await this.twitterRepo.update(
      {
        ...params,
      },
      {
        where: { twitter_profile_id },
        returning: true,
      },
    );
    return TwitterUserEntity.fromRepo(userRepo);
  }
}

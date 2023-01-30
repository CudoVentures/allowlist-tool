import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { UserRepo } from './repos/user.repo';
import { DiscordUserRepo } from './repos/discord_user.repo';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TwitterUserRepo } from './repos/twitter_user.repo';

@Module({
  imports: [
    SequelizeModule.forFeature([UserRepo,DiscordUserRepo, TwitterUserRepo]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  exports: [SequelizeModule, UserService],
  controllers: [UserController],
})
export class UserModule {}

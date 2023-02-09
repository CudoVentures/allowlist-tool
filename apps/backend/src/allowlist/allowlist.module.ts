import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';
import { AllowlistController } from './allowlist.controller';
import { AllowlistRepo } from './repos/allowlist.repo';
import { AllowlistService } from './allowlist.service';
import { DiscordModule } from '../discord/discord.module';

@Module({
  imports: [SequelizeModule.forFeature([AllowlistRepo]), UserModule, DiscordModule],
  providers: [AllowlistService],
  controllers: [AllowlistController],
  exports: [SequelizeModule],
})
export class AllowlistModule {}

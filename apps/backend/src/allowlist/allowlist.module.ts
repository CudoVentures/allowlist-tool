import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';
import { AllowlistController } from './allowlist.controller';
import { AllowlistRepo } from './repos/allowlist.repo';
import { AllowlistService } from './allowlist.service';

@Module({
  imports: [SequelizeModule.forFeature([AllowlistRepo]), UserModule],
  providers: [AllowlistService],
  controllers: [AllowlistController],
  exports: [SequelizeModule],
})
export class AllowlistModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AllowlistController } from './allowlist.controller';
import { Allowlist } from './allowlist.model';
import { AllowlistService } from './allowlist.service';

@Module({
  imports: [SequelizeModule.forFeature([Allowlist])],
  providers: [AllowlistService],
  controllers: [AllowlistController],
  exports: [SequelizeModule],
})
export class AllowlistModule {}

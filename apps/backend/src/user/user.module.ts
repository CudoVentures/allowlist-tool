import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { UserRepo } from './repos/user.repo';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([UserRepo]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService],
  exports: [SequelizeModule, UserService],
  controllers: [UserController],
})
export class UserModule {}

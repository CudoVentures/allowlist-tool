import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Req() req): Promise<User> {
    if (!req.session.user) {
      return this.userService.clearSession(req.query.userAddress);
    }

    return this.userService.findByAddress(req.query.userAddress);
  }
}

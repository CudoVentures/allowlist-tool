import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from '../auth/guards/loggedIn.guard';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(LoggedInGuard)
  async getUser(@Req() req): Promise<User> {
    return this.userService.findOne(req.session.user.id);
  }
}

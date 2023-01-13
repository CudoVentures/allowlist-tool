import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import UserEntity from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Req() req) {
    if (req.session.user.twitter) {
      return this.userService.findByTwitterId(req.session.user.twitter.twitter_profile_id)
    }
    if (req.session.user.discord) {
      return this.userService.findByDiscordId(req.session.user.discord.discord_profile_id)
    }
  }
}

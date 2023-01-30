import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import UserEntity from './entities/user.entity';
import TwitterEntity from './entities/twitter_user.entity'
import DiscordEntity from './entities/discord_user.entity'
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async getUser(@Req() req) {
    let twitterUser: TwitterEntity = undefined
    let discordUser: DiscordEntity = undefined

    if (req.session.user.twitter) {
      twitterUser = await this.userService.findByTwitterId(req.session.user.twitter.twitter_profile_id)
    }

    if (req.session.user.discord) {
      discordUser = await this.userService.findByDiscordId(req.session.user.discord.discord_profile_id)
    }

    return {
      twitter: {
        id: twitterUser?.twitter_profile_id || '',
        userName: twitterUser?.twitter_profile_username || '',
        accessToken: twitterUser?.twitter_access_token || ''
      },
      discord: {
        id: discordUser?.discord_profile_id || '',
        userName: discordUser?.discord_profile_username || '',
        accessToken: discordUser?.discord_access_token || ''
      }
    }
  }
}

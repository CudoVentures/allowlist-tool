import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CONNECTED_SOCIAL_MEDIA_INFO, emptyGuildInfo } from '../../../common/interfaces';

import UserEntity from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async getUser(@Req() req) {
    let twitterUser: UserEntity = undefined
    let discordUser: UserEntity = undefined

    if (req.session.user?.twitter) {
      twitterUser = await this.userService.findByTwitterId(req.session.user.twitter.twitter_profile_id)
    }

    if (req.session.user?.discord) {
      discordUser = await this.userService.findByDiscordId(req.session.user.discord.discord_profile_id)
    }

    const response: CONNECTED_SOCIAL_MEDIA_INFO = {
      twitter: {
        id: twitterUser?.twitter_profile_id || '',
        accessToken: twitterUser?.twitter_access_token || '',
        userName: twitterUser?.twitter_profile_username || '',
        guild: emptyGuildInfo //We won't have this field for Twitter
      },
      discord: {
        id: discordUser?.discord_profile_id || '',
        accessToken: discordUser?.discord_access_token || '',
        userName: discordUser?.discord_profile_username || '',
        guild: req.session.user.discord?.guild || emptyGuildInfo
      }
    }

    return response
  }
}

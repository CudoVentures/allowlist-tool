import {
    Controller,
    Res,
    Get,
    Param,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscordService } from './discord.service';
import { DISCORD_API_MSGS } from '../../../common/interfaces';

@ApiTags('Discord')
@Controller('discord')
export class DiscordController {
    constructor(private discordService: DiscordService) { }

  @Get('guilds/:inviteCode/roles/:roleId/name')
    async getRoleNameByRoleId(
    @Param('roleId') roleId: string,
    @Param('inviteCode') inviteCode: string,
    ) {
        try {
            return this.discordService.getRoleNameByRoleId(inviteCode, roleId)
        } catch {
            throw new BadRequestException(DISCORD_API_MSGS.ExpiredOrUnknownInvite)
        }
    }

  @Get('guild/:code/:userId')
  async isUserJoinedDiscordGuild(
    @Param('code') code: string,
    @Param('userId') userId: string,
    @Res() res,
  ) {
      try {
          res.send({
              isUserJoinedDiscordGuild: await this.discordService.isUserJoinedByInvite(code, userId),
          })
      } catch (error) {
          console.error(error.message)
          throw new BadRequestException(DISCORD_API_MSGS.ExpiredOrUnknownInvite)
      }
  }

  @Get('invite/:code/guild/name')
  async getGuildNameByInviteCode(
    @Param('code') code: string,
  ): Promise<string> {
      try {
          return this.discordService.getGuildNameByInviteCode(code)
      } catch {
          throw new BadRequestException(DISCORD_API_MSGS.ExpiredOrUnknownInvite)
      }
  }

}

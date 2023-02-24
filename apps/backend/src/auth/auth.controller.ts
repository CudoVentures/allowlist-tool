import {
  Controller,
  Req,
  Res,
  Get,
  UseGuards,
  Post,
  UseInterceptors,
  Body
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignedMessageDto } from '../allowlist/dto/signed-message.dto';
import { SignMessagePipe } from '../allowlist/pipes/sign-message.pipe';
import { TransactionInterceptor } from '../common/common.interceptors';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { TwitterAuthGuard } from './guards/twitter-auth.guard';
import { DiscordService } from '../discord/discord.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { WS_MSGS, WS_ROOM } from 'apps/common/interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private discordService: DiscordService,
    private websocketGateway: WebsocketGateway
  ) { }

  @UseInterceptors(TransactionInterceptor)
  @Post('login')
  async login(
    @Req() req,
    @Res() res,
    @Body(SignMessagePipe) signedMessageDto: SignedMessageDto,
  ) {
    const user = await this.authService.login(signedMessageDto.connectedAddress);
    req.session.user = user;
    res.status(200)
    res.send({
      userId: user.id
    })
  }

  @Get('discord/login')
  @UseGuards(DiscordAuthGuard)
  async discordLogin() { }

  @Get('discord/logout')
  async discordLogOut(@Req() req) {
    if (req.session.user && req.session.user.discord) {
      req.session.user.discord = undefined;
    }
  }

  @Get('discord/callback')
  @UseGuards(DiscordAuthGuard)
  async discordCallback(@Req() req, @Res() res) {
    const user = req.user
    if (req.query?.guild_id) {
      user.guild = await this.discordService.getGuildInfoByGuildId(req.query.guild_id)
    }
    if (req.session.user) {
      req.session.user.discord = user;
    } else {
      req.session.user = {
        discord: user
      }
    }
    this.websocketGateway.sendMessageToClient(
      WS_ROOM.socialMediaEvents,
      WS_MSGS.socialMediaSuccess
    )
    res.send(`<script>window.close()</script>`);
  }

  @Get('twitter/login')
  @UseGuards(TwitterAuthGuard)
  async twitterLogin() { }

  @Get('twitter/logout')
  async twitterLogOut(@Req() req) {
    if (req.session.user && req.session.user.twitter) {
      req.session.user.twitter = undefined;
    }
  }

  @Get('twitter/callback')
  @UseGuards(TwitterAuthGuard)
  async twitterCallback(@Req() req, @Res() res) {
    if (req.session.user) {
      req.session.user.twitter = req.user;
    } else {
      req.session.user = { twitter: req.user }
    }
    this.websocketGateway.sendMessageToClient(
      WS_ROOM.socialMediaEvents,
      WS_MSGS.socialMediaSuccess
    )
    res.send(`<script>window.close()</script>`);
  }
}

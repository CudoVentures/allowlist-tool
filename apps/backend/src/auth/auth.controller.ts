import {
  Controller,
  Req,
  Res,
  Get,
  UseGuards,
  Post,
  UseInterceptors,
  Query,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignedMessageDto } from '../allowlist/dto/signed-message.dto';
import { SignMessagePipe } from '../allowlist/pipes/sign-message.pipe';
import { TransactionInterceptor } from '../common/common.interceptors';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { TwitterAuthGuard } from './guards/twitter-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

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
    if (req.session.user) {
      req.session.user.discord = req.user;
    } else {
      req.session.user = {
        discord: req.user
      }
    }
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
    res.send(`<script>window.close()</script>`);
  }
}

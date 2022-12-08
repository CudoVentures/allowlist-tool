import {
  Controller,
  Req,
  Res,
  Get,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { TwitterAuthGuard } from './guards/twitter-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Get('login')
  async login(@Req() req, @Res() res) {
    const address = req.query.address;

    if (!address) {
      throw new BadRequestException();
    }

    req.session.user = { address };
    res.status(200).send();
  }

  @Get('discord/login')
  @UseGuards(DiscordAuthGuard)
  async discordLogin() {}

  @Get('discord/callback')
  @UseGuards(DiscordAuthGuard)
  async discordCallback(@Req() req, @Res() res) {
    req.session.user = req.user;
    res.redirect(`/`);
  }

  @Get('twitter/login')
  @UseGuards(TwitterAuthGuard)
  async twitterLogin() {}

  @Get('twitter/callback')
  @UseGuards(TwitterAuthGuard)
  async twitterCallback(@Req() req, @Res() res) {
    req.session.user = req.user;
    res.redirect(`/`);
  }
}

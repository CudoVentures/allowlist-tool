import { Controller, Req, Res, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { TwitterAuthGuard } from './guards/twitter-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async login(@Req() req, @Res() res) {
    await this.authService.login(req.query.userAddress);
    res.send(200);
  }

  @Get('discord/login')
  @UseGuards(DiscordAuthGuard)
  async discordLogin(@Req() req, @Res() res) {}

  @Get('discord/callback')
  @UseGuards(DiscordAuthGuard)
  async discordCallback(@Req() req, @Res() res) {
    req.session.user = req.user;
    res.redirect(`/home`);
  }

  @Get('twitter/login')
  @UseGuards(TwitterAuthGuard)
  async twitterLogin(@Req() req, @Res() res) {}

  @Get('twitter/callback')
  @UseGuards(TwitterAuthGuard)
  async twitterCallback(@Req() req, @Res() res) {
    req.session.user = req.user;
    res.redirect(`/home`);
  }
}

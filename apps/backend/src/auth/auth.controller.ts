import {
  Controller,
  Req,
  Res,
  Get,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignedMessageDto } from '../allowlist/dto/signed-message.dto';
import { SignedMessageGuard } from '../allowlist/guards/signed-message.guard';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { TwitterAuthGuard } from './guards/twitter-auth.guard';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(SignedMessageGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Req() req,
    @Res() res,
    @Body() signedMessageDto: SignedMessageDto,
  ) {
    const user = await this.authService.login(signedMessageDto.address);
    req.session.user = user;
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

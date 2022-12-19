import {
  Controller,
  Req,
  Res,
  Get,
  UseGuards,
  Post,
  UseInterceptors,
  Query,
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
  constructor(private authService: AuthService) {}

  @UseInterceptors(TransactionInterceptor)
  @Post('login')
  async login(
    @Req() req,
    @Res() res,
    @Query(SignMessagePipe) signedMessageDto: SignedMessageDto,
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

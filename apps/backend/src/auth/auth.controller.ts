import { Controller, Req, Res, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { TwitterAuthGuard } from './guards/twitter-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('discord/login')
    @UseGuards(DiscordAuthGuard)
    async discordLogin(@Req() req, @Res() res) {   
        
    }

    @Get('discord/callback')
    @UseGuards(DiscordAuthGuard)
    async discordCallback(@Req() req, @Res() res) {
        res.sendStatus(200)
        return req.body;
    }

    @Get('twitter/login')
    @UseGuards(TwitterAuthGuard)
    async twitterLogin(@Req() req, @Res() res) {   
        
    }

    @Get('twitter/callback')
    @UseGuards(TwitterAuthGuard)
    async twitterCallback(@Req() req, @Res() res) {
        res.sendStatus(200)
        return req.body;
    }
}
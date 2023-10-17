import { Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import UserEntity from '../../user/entities/user.entity';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.APP_DISCORD_CLIENT_ID,
            clientSecret: process.env.App_Discord_Client_Secret,
            callbackURL: process.env.APP_DISCORD_CALLBACK_URL,
            scope: ['identify', 'email', 'guilds', 'guilds.members.read'],
            passReqToCallback: true,
        });
    }

    async validate(req, accessToken, refreshToken, profile): Promise<UserEntity> {
        const user = await this.authService.validateDiscordUser(
            req,
            accessToken,
            refreshToken,
            profile,
        );

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user;
    }
}

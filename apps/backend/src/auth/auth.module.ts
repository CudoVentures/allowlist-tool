import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DiscordModule } from '../discord/discord.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './strategies/discord.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';

@Module({
  imports: [UserModule, PassportModule, DiscordModule],
  providers: [AuthService, DiscordStrategy, TwitterStrategy, UserService, WebsocketGateway],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

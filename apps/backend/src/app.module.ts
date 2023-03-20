import Path from 'path';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user/user.service';
import { AllowlistModule } from './allowlist/allowlist.module';
import { AllowlistService } from './allowlist/allowlist.service';
import { AllowlistController } from './allowlist/allowlist.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserController } from './user/user.controller';
import { DiscordService } from './discord/discord.service';
import { DiscordModule } from './discord/discord.module';
import { DiscordController } from './discord/discord.controller';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { TwitterModule } from './twitter/twitter.module';
import { TwitterService } from './twitter/twitter.service';
import { TwitterController } from './twitter/twitter.controller';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          dialect: 'postgres',
          host: config.get('APP_DATABASE_HOST'),
          port: config.get('APP_DATABASE_PORT'),
          username: config.get('APP_DATABASE_USER'),
          password: config.get('APP_DATABASE_PASS'),
          database: config.get('APP_DATABASE_DB_NAME'),
          autoLoadModels: true,
          synchronize: true,
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: Path.join(__dirname, '..', 'frontend', 'src', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./config/.env'],
      load: [
        () => {
          const Config = {};
          Object.keys(process.env).forEach((envName) => {
            const envNameUppercase = envName.toUpperCase();
            if (envNameUppercase.startsWith('APP_') === false) {
              return;
            }

            Config[envNameUppercase] = process.env[envName];
          });
          return Config;
        },
      ],
    }),
    AuthModule,
    UserModule,
    PassportModule.register({ session: true }),
    AllowlistModule,
    DiscordModule,
    TwitterModule
  ],
  providers: [AppService, AuthService, UserService, AllowlistService, DiscordService, TwitterService, WebsocketGateway],
  controllers: [AuthController, AllowlistController, UserController, DiscordController, TwitterController],
})

export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly discordService: DiscordService) { }

  async onModuleInit() {
    await this.discordService.connect();
  }

  configure(consumer: MiddlewareConsumer) {
    // remove auth middleware for now - we don't need it
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude({ path: '/api/v1/auth/login', method: RequestMethod.POST })
    //   .forRoutes('/');
  }
}

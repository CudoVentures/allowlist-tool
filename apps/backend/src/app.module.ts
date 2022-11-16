import Path from 'path';
import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          dialect: 'postgres',
          host: config.get('APP_DATABASE_HOST'),
          port: 5434,
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
  ],
  providers: [AppService, AuthService, UserService, AllowlistService],
  controllers: [AuthController, AllowlistController],
})
export class AppModule {}

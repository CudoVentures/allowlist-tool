import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import { GlobalGuard } from './auth/guards/global-auth.guard';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console
  });

  app.useGlobalGuards(new GlobalGuard(new Reflector));
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(
    session({
      cookie: {
        maxAge: 2147483647, // 2^31 = 2147483647
      },
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const config = new DocumentBuilder()
    .setTitle('Cudos allowlist tool')
    .setDescription('Cudos allowlist tool descrition')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('APP_PORT');
  await app.listen(appPort);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
  });
}

bootstrap();

import {
  ClassSerializerInterceptor,
  HttpStatus,
  RequestMethod,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
  VersioningType
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory , Reflector} from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AuthService } from './modules/auth/auth.service';
import { AppModule } from './app.module';


import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';



// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();

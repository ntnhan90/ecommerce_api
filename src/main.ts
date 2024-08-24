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
import { NestFactory, Reflector } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
// import { AuthService } from './api/auth/auth.service';
import { AppModule } from './app.module';
import { type AllConfigType } from './config/config.type';
//import { GlobalExceptionFilter } from './filters/global-exception.filter';
//import { AuthGuard } from './guards/auth.guard';
import setupSwagger from 'src/utils/setup-swagger'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  //app.useLogger(app.get(Logger));
  app.use(helmet());

  // For high-traffic websites in production, it is strongly recommended to offload compression from the application server - typically in a reverse proxy (e.g., Nginx). In that case, you should not use compression middleware.
  app.use(compression());
  
  const configService = app.get(ConfigService<AllConfigType>);
  const reflector = app.get(Reflector);
  const isDevelopment =
  configService.getOrThrow('app.nodeEnv', { infer: true }) === 'development';

  
  const corsOrigin = configService.getOrThrow('app.corsOrigin', {
    infer: true,
  });
  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  console.info('CORS Origin:', corsOrigin);


  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: [
        // { method: RequestMethod.GET, path: '/' },
        { method: RequestMethod.GET, path: 'health' },
      ],
    },
  );
 
  app.enableVersioning({
    type: VersioningType.URI,
  });


   /* */
   if (isDevelopment) {
    setupSwagger(app);
  }

  //await app.listen(configService.get<string>('PORT'));
  await app.listen(configService.getOrThrow('app.port', { infer: true }));

  console.info(`Server running on ${await app.getUrl()}`);

  return app;
}
bootstrap();

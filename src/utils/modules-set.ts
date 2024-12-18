import { ApiModule } from 'src/modules/api.module';
// auth
import appConfig from 'src/config/app.config';
import { AllConfigType } from 'src/config/config.type';
import { Environment } from 'src/constants/app.constant';
import databaseConfig from 'src/database/config/database.config';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import mailConfig from 'src/mail/config/mail.config';
import { MailModule } from 'src/mail/mail.module';
import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  	AcceptLanguageResolver,
	HeaderResolver,
	I18nModule,
	QueryResolver
} from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import loggerFactory from './logger-factory';

function generateModuleSet(){
    const imports: ModuleMetadata['imports'] = [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig, databaseConfig],
          envFilePath: '.env',
        }),
    ];

    let customModules: ModuleMetadata['imports'] = [];

	const dbModule = TypeOrmModule.forRootAsync({
		useClass: TypeOrmConfigService,
		dataSourceFactory: async(options: DataSourceOptions) =>{
			if(!options) {
				throw new Error('invalid option passed');
			}
			return new DataSource(options).initialize();
		}
	})

	const i18nModule = I18nModule.forRootAsync({
		resolvers: [
		  { use: QueryResolver, options: ['lang'] },
		  AcceptLanguageResolver,
		  new HeaderResolver(['x-lang']),
		],
		useFactory: (configService: ConfigService<AllConfigType>) => {
		  const env = configService.get('app.nodeEnv', { infer: true });
		  const isLocal = env === Environment.LOCAL;
		  const isDevelopment = env === Environment.DEVELOPMENT;
		  return {
			fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
			  	infer: true,
			}),
			loaderOptions: {
				path: path.join(__dirname, '/../i18n/'),
				watch: isLocal,
			},
			typesOutputPath: path.join(
				__dirname,
				'../../src/generated/i18n.generated.ts',
			),
			logging: isLocal || isDevelopment, // log info on missing keys
		  };
		},
		inject: [ConfigService],
	  });

	const loggerModule = LoggerModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: loggerFactory
	})
	
    const modulesSet = process.env.MODULES_SET || 'monolith';
    switch (modulesSet) {
        case 'monolith':
          	customModules = [
            	ApiModule,
				dbModule,
			//	i18nModule,
				loggerModule,
				MailModule,
          	];
         	break;
        case 'api':
          	customModules = [
            	ApiModule,
				dbModule,
			//	i18nModule,
				loggerModule,
				MailModule,
         	];
          	break;
        default:
          	console.error(`Unsupported modules set: ${modulesSet}`);
          	break;
    }

    return imports.concat(customModules);
}

export default generateModuleSet;
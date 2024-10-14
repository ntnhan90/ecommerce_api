import { ApiModule } from 'src/modules/api.module';
// auth
import appConfig from 'src/config/app.config';
import { AllConfigType } from 'src/config/config.type';
import { Environment } from 'src/constants/app.constant';
import databaseConfig from 'src/database/config/database.config';



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
				loggerModule,
          	];
         	break;
        case 'api':
          	customModules = [
            	ApiModule,
				loggerModule
         	];
          	break;
        default:
          	console.error(`Unsupported modules set: ${modulesSet}`);
          	break;
    }

    return imports.concat(customModules);
}

export default generateModuleSet;
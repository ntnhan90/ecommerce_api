import appConfig from 'src/config/app.config';

import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'src/modules/api.module';
import path from 'path';

function generateModuleSet(){
    const imports: ModuleMetadata['imports'] = [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig],
          envFilePath: '.env',
        }),
    ];

    let customModules: ModuleMetadata['imports'] = [];

    const modulesSet = process.env.MODULES_SET || 'monolith';
    switch (modulesSet) {
        case 'monolith':
          customModules = [
            ApiModule,
          ];
          break;
        case 'api':
          customModules = [
            ApiModule,
          ];
          break;
        default:
          console.error(`Unsupported modules set: ${modulesSet}`);
          break;
      }

    return imports.concat(customModules);
}

export default generateModuleSet;
import TypeOrmCustomLogger from "src/utils/typeorm-custom-logger";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { AllConfigType } from "src/config/config.type";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService<AllConfigType>){}

    createTypeOrmOptions():  TypeOrmModuleOptions {
        return {
            type: this.configService.get('database.type', { infer: true }),
            host: this.configService.get('database.host', { infer: true }),
            port: this.configService.get('database.port', { infer: true }),
            username: this.configService.get('database.username', { infer: true }),
            password: this.configService.get('database.password', { infer: true }),
            database: this.configService.get('database.name', { infer: true }),
            synchronize: this.configService.get('database.synchronize', {
              infer: true,
            }),
            dropSchema: false,
            keepConnectionAlive: true,
            logger: TypeOrmCustomLogger.getInstance(
              'default',
              this.configService.get('database.logging', { infer: true })
                ? ['error', 'warn', 'query', 'schema']
                : ['error', 'warn'],
            ),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            migrationsTableName: 'migrations',
          } as TypeOrmModuleOptions;
    }

}
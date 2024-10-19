import validateConfig from "src/utils/validate-config";
import { registerAs } from "@nestjs/config";
import { 
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
    ValidateIf
} from "class-validator";
import { DatabaseConfig } from "./database-config.type";

class EnvironmentVariablesValidator{
  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DB_TYPE: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DB_HOST: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DB_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DB_NAME: string;

  @ValidateIf((envValues) => !envValues.DATABASE_URL)
  @IsString()
  DB_USERNAME: string;

  @IsBoolean()
  @IsOptional()
  DB_LOGGING: boolean;

  @IsBoolean()
  @IsOptional()
  DB_SYNCHRONIZE: boolean;

}

//export default registerAs<DatabaseConfig>('database', () => {
export default registerAs<DatabaseConfig>('database', () => {
    console.info(`Register DatabaseConfig from  environemt variables`);
    validateConfig(process.env, EnvironmentVariablesValidator);
    
    return{
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
            ? parseInt(process.env.DB_PORT, 10)
            : 8889,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        logging: process.env.DATABASE_LOGGING === 'true',
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    }
})
import { Environment, LogService } from "src/constants/app.constant";
import { registerAs } from "@nestjs/config";
import { 
    IsBoolean ,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    Max,
    Min
} from "class-validator";
import process from "node:process";
import validateConfig from "src/utils/validate-config";
import { AppConfig } from "./app-config.type";

class EnvironmentVariablesValidator {
    @IsEnum(Environment)
    @IsOptional()
    NODE_ENV: Environment;
  
    @IsString()
    @IsOptional()
    APP_NAME: string;
  
    @IsUrl({ require_tld: false })
    @IsOptional()
    APP_URL: string;
  
    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    APP_PORT: number;
  
    @IsBoolean()
    @IsOptional()
    APP_DEBUG: boolean;
  
    @IsString()
    @IsOptional()
    API_PREFIX: string;
  
    @IsString()
    @IsOptional()
    APP_FALLBACK_LANGUAGE: string;
  
    @IsString()
    @IsOptional()
    APP_LOG_LEVEL: string;
  
    @IsString()
    @IsEnum(LogService)
    @IsOptional()
    APP_LOG_SERVICE: string;
  
    @IsString()
    @IsOptional()
    APP_CORS_ORIGIN: string;
}

function getCorsOrigin() {
    const corsOrigin = process.env.APP_CORS_ORIGIN;
    if( corsOrigin === 'true') return true;
    if( corsOrigin === '*') return '*' ;
    return corsOrigin?.includes(',')
        ? corsOrigin.split(',').map((origin) => origin.trim())
        : false;
}
import { DatabaseConfig } from "src/database/config/database-config.type";
import { AppConfig } from "./app-config.type";
import databaseConfig from "src/database/config/database.config";
import { MailConfig } from 'src/mail/config/mail-config.type';

export type AllConfigType ={
    app: AppConfig,
    database: DatabaseConfig
    mail: MailConfig
}
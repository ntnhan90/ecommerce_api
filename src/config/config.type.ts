import { AppConfig } from "./app-config.type";
import { MailConfig } from 'src/mail/config/mail-config.type';

export type AllConfigType ={
    app: AppConfig,

    mail: MailConfig
}
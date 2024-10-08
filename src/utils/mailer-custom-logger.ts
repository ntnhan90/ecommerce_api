import { Logger } from "@nestjs/common";
import { Logger as NodeMailerLogger, LoggerLevel } from "nodemailer/lib/shared";

class MaillerCustomLogger implements NodeMailerLogger {
    static getInstance(logLevels?: LoggerLevel[]) : MaillerCustomLogger{
        const logger = new Logger(MaillerCustomLogger.name);
        return new MaillerCustomLogger(logger, logLevels);    
    }

    constructor(
        private readonly logger:Logger,
        private readonly logLevels:LoggerLevel [] = [
            'trace',
            'debug',
            'info',
            'warn',
            'error',
            'fatal',
        ]
    ) {}

    level(level: LoggerLevel) :void{
        if (this.logLevels.includes(level)) {
            this.logger.log(`khuong level: ${level}`);
        }
        this.logger.log(`khuong level: ${level}`);
    }

    trace(...params: any[]): void {
        if (this.logLevels.includes('trace')) {
            this.logger.log(
                this.getPrefix(params[0]) + params[1],
                ...params.slice(2),
            );
        }
    }
    
    debug(...params: any[]): void {
        if (this.logLevels.includes('debug')) {
          this.logger.debug(
            this.getPrefix(params[0]) + params[1],
            ...params.slice(2),
          );
        }
    }
    
    info(...params: any[]): void {
        if (this.logLevels.includes('info')) {
            this.logger.log(
                this.getPrefix(params[0]) + params[1],
                ...params.slice(2),
            );
        }
    }
    
    warn(...params: any[]): void {
        if (this.logLevels.includes('warn')) {
            this.logger.warn(
                this.getPrefix(params[0]) + params[1],
                ...params.slice(2),
          );
        }
    }
    
    error(...params: any[]): void {
        if (this.logLevels.includes('error')) {
          this.logger.error(
            this.getPrefix(params[0]) + params[1],
            ...params.slice(2),
          );
        }
    }
    
    fatal(...params: any[]): void {
        if (this.logLevels.includes('fatal')) {
          this.logger.error(
            this.getPrefix(params[0]) + params[1],
            ...params.slice(2),
          );
        }
    }
    
    log(message: string) {
        if (this.logLevels.includes('info')) {
          this.logger.log(message);
        }
    }

    private getPrefix(entry: any){
        let prefix = '';
        if(entry){
            if(entry.tnx === 'server'){
                prefix = 'S'
            }else if( entry.tnx === 'client'){
                prefix = 'C';
            }

            if (entry.sid) {
                prefix = '[' + entry.sid + '] ' + prefix;
            }
        
            if (entry.cid) {
                prefix = '[#' + entry.cid + '] ' + prefix;
            }
        }

        return prefix;
    }
}

export default MaillerCustomLogger;
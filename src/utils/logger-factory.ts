import { type AllConfigType } from "src/config/config.type";
import { loggingRedactPaths, LogService } from "src/constants/app.constant";
import { ConfigService } from "@nestjs/config";
import { type IncomingMessage, type ServerResponse } from "http";
import { Params } from "nestjs-pino";
import { GenReqId, Options, type ReqId } from "pino-http";
import {v4 as uuidv4} from 'uuid';

// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity
const PinoLevelToGoogleLoggingSeveriryLookup = Object.freeze({
    trace: 'DEBUG',
    debug: 'DEBUG',
    info: 'INFO',
    warn: 'WARNING',
    error: 'ERROR',
    fatal: 'CRITICAL',
})

const GenReqId: GenReqId = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
) => {
    const id:  ReqId = req.headers['x-request-id'] || uuidv4();
    res.setHeader('X-Request-Id', id.toString());
    return id;
}

const customSuccessMessage = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    responseTime: number
) => {
    return `[${req.id || '*'}] "${req.method} ${req.url}" ${res.statusCode} - "${req.headers['host']}" "${req.headers['user-agent']}" - ${responseTime} ms`;
}

const customReceivedMessage = (req: IncomingMessage) =>{
    return `[${req.id || '*'}] "${req.method} ${req.url}"`;
}

const customErrorMessage = (req, res, err) => {
    return `[${req.id || '*'}] "${req.method} ${req.url}" ${res.statusCode} - "${req.headers['host']}" "${req.headers['user-agent']}" - message: ${err.message}`;
};

function logServiceConfig(LogService: any) : Options{
    switch(LogService){
        case LogService.GOOGLE_LOGGING:
            return googleLoggingConfig();
        case LogService.AWS_CLOUNDWATCH:
            return cloundWatchLoggingConfig();
        case LogService.CONSOLE:
        default:
            return consoleLoggingConfig();
    }
}

function cloundWatchLoggingConfig():Options{
    return{
        messageKey: 'message'
    }
}

function googleLoggingConfig():Options{
    return {
        messageKey: 'message',
        formatters: {
            level(label, number) {
                return{
                    severity:  
                        PinoLevelToGoogleLoggingSeveriryLookup[label] ||
                        PinoLevelToGoogleLoggingSeveriryLookup['info'],
                    level: number,
                }
            }
        }
    }    
}

function consoleLoggingConfig(): Options {
    return {
      messageKey: 'msg',
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
          ignore:
            'req.id,req.method,req.url,req.headers,req.remoteAddress,req.remotePort,res.headers',
        },
      },
    };
  }

async function loggerFactory(
    configService:ConfigService<AllConfigType>
): Promise<Params> {
    const logLevel = configService.get('app.logLevel', {infer: true});
    const logService = configService.get('app.logService', { infer: true });
    const isDebug = configService.get('app.debug', {infer: true});
    return{
        pinoHttp:{
            level: logLevel,
            genReqId: isDebug ? GenReqId: undefined,
            serializers: isDebug
            ? {
                req: (req) => {
                  req.body = req.raw.body;
                  return req;
                },
              }
            : undefined,
            customSuccessMessage,
            customReceivedMessage,
            customErrorMessage,
            redact: {
                paths: loggingRedactPaths,
                censor: '**GDPR COMPLIANT**',
            },
            ...logServiceConfig(logService),
        }
    }
}

export default loggerFactory;
import * as winston from 'winston';
//logzio
import * as winstonlogzio from 'winston-logzio';
const loggerOptions={
  token:'gMhCEKnwqQHGCDfSIWckykQOSAbIyRph',
  host:'listener-logz.io',
  type:'node-js-typescript-microservice-product-catalogue',
  colorize:true,
  prettyPrint: true,
  handleExceptions: true,
  humanReadableUnhandledException: true
}
winston["emitErrs"]=true;


export const logger = new winston.Logger({
  transports:[
    new winston.transports.File({
      level:'all',
      filename:'my-logs-file.txt',
      handleExceptions:true,
      json:false,
      maxsize:5242880,
      maxFiles:5,
      colorize:true
    }),
    new winston.transports.Console({
      level:'debug',
      handleExceptions:true,
      json:false,
      colorize:true,
      prettyPrint:true
    })
  ],
  exitOnError:true
});

const env = 'development';

// Development Logger

logger.add(winstonlogzio,loggerOptions);

process.on('unhandledRejection', function (reason, p) {
  logger.warn('system level exceptions at, Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

import * as config from 'config'; // library for code configuration setups
import {logger} from './Logging';

export const logHttpRequestError = (request, errorObj) => {
    const logObj = {
        server_type : config.get('server_type'), // we take the server type from configuration
                                                 //in order to know which server created the log such as production\staging etc
        message : errorObj.message,
        stack : errorObj.stack,
        url : request.url,
        query : JSON.stringify(request.query),
        body : JSON.stringify(request.body),
        userEmail : request.user.email,
        initiator : 'server',
        errorType : 'HTTP_REQUEST_ERROR',
    };
    logger.error(logObj.message,logObj);
};
export const logGenerelError = (errorObj, errorType, otherProperties = {}) => {
    let logObj = {
        server_type : config.get('server_type'),
        message : errorObj.message,
        stack : errorObj.stack,
        initiator : 'server',
        errorType,
        
     }
    logObj = Object.assign(otherProperties, logObj); // merge objects
    logger.error(logObj.message,logObj);
}
export const logSimpleTextError = (message, errorType, otherProperties = {}) => {
    let logObj = {
        server_type : config.get('server_type'),
        message,
        errorType,
    }
    logObj = Object.assign(otherProperties, logObj);
    logger.error(logObj.message,logObj);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
exports.logger = new winston.Logger();
const env = 'development';
// Development Logger
if (env === 'development') {
    exports.logger.add(winston.transports.Console, {
        type: 'verbose',
        colorize: true,
        prettyPrint: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
    });
}
process.on('unhandledRejection', function (reason, p) {
    exports.logger.warn('system level exceptions at, Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});
//# sourceMappingURL=logging.js.map
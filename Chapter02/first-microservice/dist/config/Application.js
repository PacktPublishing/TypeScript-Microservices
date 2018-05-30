"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("../common/logging");
const Express_1 = require("./Express");
class Application {
    constructor() {
        this.express = new Express_1.ExpressConfig();
        const port = 3000;
        this.server = this.express.app.listen(port, () => {
            logging_1.logger.info(`Server Started! Express: http://localhost:${port}`);
        });
    }
}
exports.Application = Application;
//# sourceMappingURL=Application.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routing_controllers_1 = require("routing-controllers");
const path = require("path");
class ExpressConfig {
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.setUpControllers();
    }
    setUpControllers() {
        const controllersPath = path.resolve('dist', 'controllers');
        //useExpressServer has lots of options, can be viewed at node_modules\routing-controllers\RoutingControllersOptions.d.ts
        routing_controllers_1.useExpressServer(this.app, {
            controllers: [controllersPath + "/*.js"]
        });
    }
}
exports.ExpressConfig = ExpressConfig;
//# sourceMappingURL=Express.js.map
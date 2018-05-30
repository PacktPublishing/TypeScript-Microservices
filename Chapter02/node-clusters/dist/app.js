"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
// Creates and configures an ExpressJS web server.
class ExprApp {
    /**
     * Configure Express middleware.
     */
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        //here we can have intialization code. 
    }
    middleware() {
        console.log("all middle ware options will be loaded here");
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello From Typescript Express Node JS Server.'
            });
        });
        this.express.use('/', router);
    }
}
exports.ExprApp = ExprApp;
//# sourceMappingURL=app.js.map
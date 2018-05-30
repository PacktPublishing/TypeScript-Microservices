import * as express from 'express';
import * as bodyParser from 'body-parser';

// Creates and configures an ExpressJS web server.
export class ExprApp {
    public express: express.Application;
    /**
     * Configure Express middleware.
     */
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        //here we can have intialization code. 
    }

    private middleware(): void {
        console.log("all middle ware options will be loaded here");
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    private routes(): void {
        let router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello From Typescript Express Node JS Server.'
            });
        });
        this.express.use('/', router);
    }
}
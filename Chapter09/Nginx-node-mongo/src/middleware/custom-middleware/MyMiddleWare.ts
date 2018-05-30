import {ExpressMiddlewareInterface} from "routing-controllers";

export class MyMiddleware implements ExpressMiddlewareInterface { // interface implementation is optional

    constructor(){}
    use(request: any, response: any, next?: (err?: any) => any): any {
        console.log("custom middleware gets called.");
        next();
    }

}
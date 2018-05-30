import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { httpRequestDurationMicroseconds } from "./metrics-modules/MetricModule";

@Middleware({ type: "after" })
export class AfterMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any) {
        console.log("called after each request");
        const responseTimes=Date.now()-response.locals.startEpoch;
        httpRequestDurationMicroseconds
         .labels(request.method,request.route.path,response.statusCode)
         .observe(responseTimes);
         next();
    }
}
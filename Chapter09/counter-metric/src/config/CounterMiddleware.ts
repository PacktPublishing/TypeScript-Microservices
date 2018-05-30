import { ExpressMiddlewareInterface } from "routing-controllers";
const pmx=require('pmx').init({http:true,errors:true, custom_probes:true,network:true,ports:true});
const pmxProbe=pmx.probe();
const pmxCounter=pmxProbe.counter({
    name:'request counter for Hello World Controller',
    agg_type:'sum'
})

export class CounterMiddleWare implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err?: any) => any ):any {
        console.log("custom middle ware");
        pmxCounter.inc();
      next();
    }
}



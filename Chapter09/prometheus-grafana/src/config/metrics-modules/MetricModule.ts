import * as promClient from 'prom-client';
import * as responseTime from 'response-time';
import { logger } from '../../common/logging';


export const Register=promClient.register;
const Counter=promClient.Counter;
const Histogram=promClient.Histogram;
const summary=promClient.Summary;
export const promInterval:number=0;

/*
Prometheus counter that counts the total number of invocations of different types of HTTP requests.
*/
export var numOfRequests=new Counter({
    name:'numOfRequests',
    help:'Number of requests which are made through out the service',
    labelNames:['method']
})

/*Prometheus client that counts the number of different paths. /hello and /world would be two different paths. */

export var totalPathsTakesn=new Counter({
    name:'pathsTaken',
    help:'paths taken in app',
    labelNames:['path']
})

/*Prometheus client to summarize HTTP method,path, response and total time taken */
export var responses=new summary({
    name:'responses',
    help:'Response time in millis',
    labelNames:['method','path','status']
})

/*Function to start metric collection */
export var startCollection=function(){
    logger.info(" Metrics can be checked out at /metrics");
    this.promInterval=promClient.collectDefaultMetrics();

}

/*THis function increments the counters executed */
export var requestCounters=function(req:any,res:any,next:any){
    if(req.path!='metrics'){
        numOfRequests.inc({method:req.method});
        totalPathsTakesn.inc({path:req.path});
    }
    next();
}

/*this function updates response summary */
export var responseCounters = responseTime(function (req, res:any, time) {
     if(req.url != '/metrics') { 
        responses.labels(req.method, req.url, res.statusCode).observe(time); 
    } }) 
    
/*Histogram function */
export var httpRequestDurationMicroseconds=new Histogram({
    name:'http_requests_duration_ms',
    help:'Duration of HTTP Requests in ms',
    labelNames:['method','route','code'],
    buckets:[0.10,5,15,100,200,300,400,500,600]
})
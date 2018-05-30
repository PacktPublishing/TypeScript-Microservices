import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import * as path from 'path';
import * as circuitBreaker from 'opossum';
import { hystrixStream } from './HystrixStream';

export class ExpressConfig{
    app: express.Express; 
    private baseline:number;
    private delay:number;
    private circuitBreakerOptions = {
        maxFailures: 5,
        timeout: 5000,
        resetTimeout: 10000,
        name: 'customName',
        group: 'customGroupName'
      };

  constructor() {
    this.baseline=20;
    console.log("Assigning 20");
    this.delay = this.baseline;
    console.log(typeof this.delay);
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.setUpControllers();
    const circuit = circuitBreaker(this.flakeFunction, this.circuitBreakerOptions);
    circuit.fallback(this.fallback);
    this.app.use('/hystrix.stream', hystrixStream(circuitBreaker));
    this.app.use('/', (request:any, response:any) => {
        circuit.fire().then((result:any) => {
           response.send(result);
        }).catch((err:any) => {
          response.send(err);
        });
    });
}

  setUpControllers(){
    const controllersPath = path.resolve('dist', 'controllers');
//useExpressServer has lots of options, can be viewed at node_modules\routing-controllers\RoutingControllersOptions.d.ts
    useExpressServer(this.app,{
        controllers:[controllersPath+"/*.js"]
    });
 }

 flakeFunction= ()=> {
    console.log(this.delay,"sasdasd");

    return new Promise((resolve, reject) => {
      if (this.delay > 1000) {
        return reject(new Error('Flakey Service is Flakey'));
      }
      setTimeout(() => {
        console.log('replying with flakey response after delay of ', this.delay);
        resolve(`Sending flakey service. Current Delay at ${this.delay}`);
        this.delay *=  2;
      }, this.delay);
    });
  }

  callingSetTimeOut(){
    setInterval(() => {
        if (this.delay !== this.baseline) {
          this.delay = this.baseline;
          console.log('resetting flakey service delay', this.delay);
        }
      }, 20000);
  }

   fallback () {
    return 'Service Fallback';
  }
  
    
}
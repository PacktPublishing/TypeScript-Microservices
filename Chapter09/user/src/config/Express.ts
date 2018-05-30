import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import * as path from 'path';
import {Tracer} from 'zipkin';
import {BatchRecorder} from 'zipkin';
import {HttpLogger} from 'zipkin-transport-http';
import {expressMiddleware as zipkinMiddleware} from 'zipkin-instrumentation-express';
const CLSContext = require('zipkin-context-cls');

export class ExpressConfig{
    app: express.Express; 
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.setUpControllers();
    this.setupZipkinServer();
  }

  setupZipkinServer(){
    const ctxImpl=new CLSContext('typescript-microservices');
    const logRecorder=new BatchRecorder({
      logger:new HttpLogger({
        endpoint:`http://localhost:9411/api/v1/spans`
      })
    })
    const tracer=new Tracer({ctxImpl:ctxImpl,recorder:logRecorder});
    this.app.use(zipkinMiddleware({tracer,serviceName:'user-service'}))
  }

  setUpControllers(){
    const controllersPath = path.resolve('dist', 'controllers');
//useExpressServer has lots of options, can be viewed at node_modules\routing-controllers\RoutingControllersOptions.d.ts
    useExpressServer(this.app,{
        controllers:[controllersPath+"/*.js"]
    });
 }
    
}
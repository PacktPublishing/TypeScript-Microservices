import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import * as path from 'path';
import { requestCounters, responseCounters, startCollection } from './metrics-modules/MetricModule';


export class ExpressConfig{
    app: express.Express; 
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    //injecting prometheus middlewares
    this.app.use(requestCounters);
    this.app.use(responseCounters);
    this.setUpControllers();
  }

  setUpControllers(){
    const controllersPath = path.resolve('dist', 'controllers');
    const middlewarepath=path.resolve('dist','config');
    startCollection();
//useExpressServer has lots of options, can be viewed at node_modules\routing-controllers\RoutingControllersOptions.d.ts
    useExpressServer(this.app,{
        controllers:[controllersPath+"/*.js"],
        middlewares:[middlewarepath+"/*.js"]
    });
 }
    
}
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import * as path from 'path';
var client = require('redis').createClient()

export class ExpressConfig{
    app: express.Express; 
  constructor() {
    this.app = express();
    var limiter = require('express-limiter')(this.app, client)
    this.app.use(cors());
    //limits requests to 100 per hour ip ip address
    limiter({
        lookup:['connection.remoteAddress'],
        total:100,
        expire:1000*60*60
    });
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.setUpControllers();
  }

  setUpControllers(){
    const controllersPath = path.resolve('dist', 'controllers');
//useExpressServer has lots of options, can be viewed at node_modules\routing-controllers\RoutingControllersOptions.d.ts
    useExpressServer(this.app,{
        controllers:[controllersPath+"/*.js"]
    });
 }
    
}
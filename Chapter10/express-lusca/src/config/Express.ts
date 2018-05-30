import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import * as path from 'path';
import * as session from 'express-session';
import * as lusca from 'lusca';

export class ExpressConfig{
    app: express.Express; 
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(session({
        secret: 'abc',
        resave: true,
        saveUninitialized: true
    }));
    this.app.use(lusca({
        csrf: true,
        csp: { /* ... */},
        xframe: 'SAMEORIGIN',
        p3p: 'ABCDEF',
        hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
        xssProtection: true,
        nosniff: true,
        referrerPolicy: 'same-origin'
    })); 

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
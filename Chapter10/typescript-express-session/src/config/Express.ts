import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import * as path from 'path';
import * as session from 'express-session';
import * as helmet from 'helmet';

export class ExpressConfig{
    app: express.Express; 
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(session({
        secret:'mySecretCookieSalt',
        name:'mycookieSessionid',
        saveUninitialized:true,
        resave:false,
        cookie:{
            httpOnly:true,
            secure:true,
            domain:'typescript-microservices.com',
            path:'/hello-world',
            expires:new Date(Date.now()+60*60*1000)
        }
    }))
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
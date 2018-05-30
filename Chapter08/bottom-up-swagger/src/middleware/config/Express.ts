import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { useExpressServer, useContainer } from 'routing-controllers';
import * as path from 'path';
import * as health from 'express-ping';
import * as helmet from 'helmet';
import { Request, Response } from 'express';
import {Container, Service} from "typedi";
const swaggerJSDoc=require('swagger-jsdoc');

export class ExpressConfig{
    app: express.Express; 
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended:false }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(health.ping());
    this.app.use(helmet());
    this.app.use(this.clientErrorHandler)
    this.setUpControllers();
    SwaggerSpec.setUpSwaggerJSDoc();
  }

  setUpControllers(){
    const controllersPath = path.resolve('dist', 'service-layer/controllers');
    useContainer(Container);
    useExpressServer(this.app,{
        controllers:[controllersPath+"/*.js"],
        cors:true
    });
 }

 

 clientErrorHandler(err:any,req:Request,res:Response,next:Function):void{
        if(err.hasOwnProperty('thrown')){
          res.status(err["status"]).send({error:err.message});
        }
 }
    
}

export class SwaggerSpec{
  private static swaggerJSON:any;
  constructor(){}
  static setUpSwaggerJSDoc(){
    let swaggerDefinition={
      info:{
        title:'Bottom up approach Product Catalog',
        version:'1.0.0',
        description:'Demonstrating typescript microservice bottom up approach'
      },
      host:'localhost:8081',
      basePath:'/'
    };
  
    let options={
      swaggerDefinition:swaggerDefinition,
      apis:['./../service-layer/controllers/*.js']
    }
      this.swaggerJSON=swaggerJSDoc(options);
  }

  static getSwaggerJSON(){
    return this.swaggerJSON;
  }
}




import * as Bacon from 'baconjs';
import { Controller, Get, JsonController, Req, Res, Param } from 'routing-controllers';
import { Request,Response } from 'express';
import {BaconService} from '../services/BaconService';

@Controller('/hello-bacon')
export class HelloBacon {

constructor(private baconService:BaconService){

}    

@Get('/:productId')
async get(@Req() req:Request,@Res() res:Response,@Param("productId") productId:number) {
  let resp:any; 
  this.baconService.baconService(productId)
        .flatMap((x)=>{
          return x==null || undefined ?"No Product Found" : x;
        })
        .onValue((o:string)=>{
           resp=o;
         })
     return resp;    
}    

}
    

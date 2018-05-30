import { Controller, Get, JsonController, Post } from 'routing-controllers';
var pmx=require('pmx');

@Controller('/hello-world')
export class HelloWorld {
private pmxVar:any;
private random:any=[];

constructor(){}


@Get('/')
async get(): Promise<any> {
   return {"msg":"This is first Typescript Microservice"};
}    


@Get('/error-route')
async throwError(): Promise<any> {
    pmx.notify(new Error("Unexpected Exception"));
   return {"msg":"This is first Typescript Microservice"};
}    

@Get('/memory-leak')
async memoryleak(): Promise<any> {
    this.random.push("randommmm");
   return {"msg":"This is first Typescript Microservice"};
}    

}
    

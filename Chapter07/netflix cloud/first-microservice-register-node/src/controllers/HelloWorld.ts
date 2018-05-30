import { Controller, Get, JsonController } from 'routing-controllers';

@Controller('')
export class HelloWorld {

constructor(){

}    
@Get('/')
async get(): Promise<any> {
  return {"msg":"This is first Typescript Microservice"}
}    

@Get('/hello-nodejs')
async getNode(): Promise<any> {
  return {"msg":"This is first Typescript Microservice from Node.js prpogram"}
}

}
    

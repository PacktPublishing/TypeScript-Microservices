import { Controller, Get, JsonController } from 'routing-controllers';

@Controller('')
export class HelloWorld {

constructor(){

}    
@Get('/')
async get(): Promise<any> {
  return {"msg":"This is first Typescript Microservice"}
}    

}
    

import { Controller, Get, JsonController, Post } from 'routing-controllers';

@Controller('/demo-one')
export class DemoOne {

constructor(){}    

@Get('/')
async get(): Promise<any> {
   return {"msg":"This is first Typescript Microservice"};
}    

}
    

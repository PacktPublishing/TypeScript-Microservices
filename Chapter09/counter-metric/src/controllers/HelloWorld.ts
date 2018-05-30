import { Controller, Get, JsonController, Post, UseBefore } from 'routing-controllers';
import { CounterMiddleWare } from '../config/CounterMiddleware';

@UseBefore(CounterMiddleWare)
@Controller('/hello-world')
export class HelloWorld {
private pmxVar:any;
private probe:any;
private metric:any;

constructor(){
}    

@Get('/')
async get(): Promise<any> {
   return {"msg":"This is first Typescript Microservice"};
}    

}
    

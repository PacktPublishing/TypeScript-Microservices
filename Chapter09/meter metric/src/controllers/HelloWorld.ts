import { Controller, Get, JsonController, Post } from 'routing-controllers';
var pmx=require('pmx');

@Controller('/hello-world')
export class HelloWorld {
private pmxVar:any;
private probe:any;
private metric:any;

constructor(){
    this.pmxVar=pmx.init({
        http:true,
        errors:true,
        custom_probes:true,
        network:true,
        ports:true
    });
  this.probe=this.pmxVar.probe();
  this.metric=this.probe.meter({
      name: 'average per minute',
      samples:60,
      timeframe:3600
  })
    
}    

@Get('/')
async get(): Promise<any> {
    this.metric.mark();
   return {"msg":"This is first Typescript Microservice"};
}    

}
    

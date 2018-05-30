import { Controller, Get, JsonController } from 'routing-controllers';
import { EurekaService } from '../config/EurekaService';
const Wreck = require('wreck');


@Controller('')
export class HelloWorld {
    
constructor(){}  

@Get('/')
async get(): Promise<any> {
  //here we will consume our registered service.
  let instances:any=EurekaService.getClient().getInstancesByAppId("HELLO-WORLD-CHAPTER-6");
  let instance=null;
  let msg="404 Not Available"
  if(instances!=null && instances.length>0){
    instance=instances[0];
    let protocol=instances[0].securePort["@enabled"]=="true"?"https":"http";
    let url=protocol+"://"+instance.ipAddr+":"+instances[0].port.$+"/";
    const {res,payload}=await Wreck.get(url);
    msg=payload.toString();
  }   
    return {"msg":msg};
}    

}
    

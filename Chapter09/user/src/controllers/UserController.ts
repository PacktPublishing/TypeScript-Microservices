import { Controller, Get, JsonController, Post } from 'routing-controllers';

@Controller('/users')
export class UserController {

constructor(){

}    

@Get('/user-by-id/:userId')
async get(userId:string): Promise<any> {
    return {"code":200,"userExists":"true"};
}    

}
    

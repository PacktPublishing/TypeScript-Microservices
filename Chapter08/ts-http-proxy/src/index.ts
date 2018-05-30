import * as httpProxy from 'http-proxy';
import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';


export class ProxyServer{
private proxy:any;
  constructor(){
    this.registerProxyServer();      
    this.proxy=httpProxy.createProxyServer({});
    //we are passing zero server options, but we can pass lots of  options such as buffer, target, agent, forward, ssl, etc.  
  }

  registerProxyServer():void{
      http.createServer((req:IncomingMessage,res:ServerResponse)=>{
          console.log("===req.rawHeaders====",req.rawHeaders);
          this.proxy.web(req,res,{target:'http://127.0.0.1:3000/hello-world'})
      }).listen(4000)}
  }
        

new ProxyServer();
import { logger } from '../common/logging';
import { ExpressConfig } from './Express';
import * as path from 'path';
import * as fs from 'fs';
import * as spdy from 'spdy';

export class Application {

  server: any;
  express: ExpressConfig;

  
  constructor() {
    this.express = new ExpressConfig();
    const certsPath = path.resolve('certs');
    const options={
      key:fs.readFileSync(certsPath+"/server.key"),
      cert:fs.readFileSync(certsPath+"/server.crt")
    }
    
    const port = 3000;
    /*
    this.server = this.express.app.listen(port, () => {
      logger.info(`Server Started! Express: http://localhost:${port}`);
    });
    */
   this.server=spdy.createServer(options,this.express.app)
                    .listen(port,(error:any)=>{
                      if(error){
                        logger.error("failed to start server with ssl",error);
                        return process.exit(1);
                      }else{
                        logger.info(`Server Started! Express: http://localhost:${port}`);
                      }
                    })

}

}
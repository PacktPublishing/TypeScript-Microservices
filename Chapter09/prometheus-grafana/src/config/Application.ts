import { logger } from '../common/logging';
import { ExpressConfig } from './Express';
import { startCollection, promInterval } from './metrics-modules/MetricModule';

export class Application {

  server: any;
  express: ExpressConfig;

  constructor() {
    this.express = new ExpressConfig();
    
    const port = 4200;
    this.server = this.express.app.listen(port, () => {
      logger.info(`Server Started! Express: http://localhost:${port}`);
});

   process.on('SIGTERM',()=>{
     if(promInterval && promInterval>0){
      clearInterval(promInterval);
     }
     this.server.close((err:any)=>{
      if(err){
        logger.error("eror while shutdown");
        process.exit(1);
      }
      process.exit(0);
     })
   })
}

}
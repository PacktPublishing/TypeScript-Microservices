import { logger } from '../common/logging';
import { ExpressConfig } from './Express';
import { Eureka } from 'eureka-js-client';
import { EurekaService } from '../config/EurekaService';

export class Application {

  server: any;
  express: ExpressConfig;

  constructor() {
    this.express = new ExpressConfig();
    const port = 4000;
    this.server = this.express.app.listen(port, () => {logger.info(`Server Started! Express: http://localhost:${port}`);});
    //start eureka client
    EurekaService.getClient().start();
    process.on('SIGINT', ()=> { //stop client
                                EurekaService.getClient().stop();
                                this.server.close()
                              });
}

}
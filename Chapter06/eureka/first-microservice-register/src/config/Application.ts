import { logger } from '../common/logging';
import { ExpressConfig } from './Express';
import { Eureka } from 'eureka-js-client';

export class Application {

  server: any;
  express: ExpressConfig;

  constructor() {
    this.express = new ExpressConfig();
    
    const port = 3001;
    this.server = this.express.app.listen(port, () => {
      logger.info(`Server Started! Express: http://localhost:${port}`);
});
  
  let client=new Eureka({
    instance: {
      app: 'hello-world-chapter-6',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      statusPageUrl: `http://localhost:${port}`,
      healthCheckUrl: `http://localhost:${port}/health`,
      port: {
        '$': port,
        '@enabled': true,
      },
      vipAddress: 'myvip',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        'name': 'MyOwn',
      },
    },
    eureka: {
      host: 'localhost',
      port: 9091,
      servicePath: '/eureka/apps/',
    }
  });
  client.start();

  process.on('SIGINT', ()=>{
    this.server.close();
    client.stop();
  });
  
}

}
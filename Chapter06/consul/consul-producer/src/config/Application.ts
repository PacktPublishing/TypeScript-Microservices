import { logger } from '../common/logging';
import { ExpressConfig } from './Express';
import * as os from 'os';
import * as uuid from 'uuid';
import * as Consul from 'consul';
import { ConsulOptions } from 'consul';

export class Application {

  server: any;
  express: ExpressConfig;
 
  constructor() {
    this.express = new ExpressConfig();
    
    const appPort = 3000;
    const PID = process.pid;
    const HOST = os.hostname();
    const CONSUL_ID = `data-${HOST}-${appPort}-${uuid.v4()}`;

    this.server = this.express.app.listen(appPort, () => {
      logger.info(`Server Started! Express: http://localhost:${appPort}`);
    });
  this.registerConsul(HOST,appPort,CONSUL_ID);
}

registerConsul(HOST:string,appPort:number,CONSUL_ID:string){
  let consulOptions:ConsulOptions={
    host:'127.0.0.1',
    port:'8500',
    secure:false,
    promisify:false
  }
  let details = {
    name: 'typescript-microservices-consul-producer',
    address: HOST,
    check: {
      ttl: '10s',
      deregister_critical_service_after: '1m'
    },
    port: appPort,
    id: CONSUL_ID
  };

  let consul=new Consul(consulOptions);

  consul.agent.service.register(details,err => {
    if (err) {
      throw new Error(err.toString());
    }
    console.log('registered with Consul');
    
    setInterval(() => {
      consul.agent.check.pass({id:`service:${CONSUL_ID}`}, (err:any) => {
        if (err) throw new Error(err);
        console.log('Send out heartbeat to consul');
      });
    }, 5 * 1000);

    process.on('SIGINT', () => {
      console.log('Process Terminating. De-Registering...');
      let details = {id: CONSUL_ID};
      consul.agent.service.deregister(details, (err) => {
        console.log('de-registered.', err);
        process.exit();
      });
});
});



let watcher = consul.watch({ method: consul.health.service,options:{
  service:'data',
  passing:true
}});
var known_data_instances:string[];

watcher.on('change', (data,res) => {
  console.log('received discovery update:', data.length);
  known_data_instances = [];
  data.forEach((entry:any) => {
    known_data_instances.push(`http://${entry.Service.Address}:${entry.Service.Port}/`);
  });
  console.log(known_data_instances);
});

watcher.on('error', err => {
  console.error('watch error', err);
});


}


}


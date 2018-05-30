import { logger } from '../common/logging';
import { ExpressConfig } from './Express';
import * as heapdump from 'heapdump';
import * as path from 'path';

export class Application {

  server: any;
  express: ExpressConfig;

  constructor() {
    this.express = new ExpressConfig();
    
    const port = 3000;
    this.server = this.express.app.listen(port, () => {
      logger.info(`Server Started! Express: http://localhost:${port}`);
});
	heapdump.writeSnapshot(path.join(__dirname,`${Date.now()}.heapsnapshot`),(err,filename)=>{
		if(err){
			console.log("failed to create heap snapshot at time of start");
		}else{
                      console.log("dump written to",filename);
               }

	});

}

}

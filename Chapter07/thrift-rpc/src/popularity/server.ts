import { config } from '@creditkarma/dynamic-config'
import { ThriftServerExpress } from '@creditkarma/thrift-server-express'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import { Popularity, PopularityService, PopularityServiceException } from '../codegen/com/popularity/PopularityService'
import { findPopularity, IMockPopularity } from './data';


 class PopularityServer{
    constructor(){
        PopularityServer.createPopularityServer();
    }
    static  async  createPopularityServer() {
        const app: express.Application = express()
        const serverConfig = await config().get('identity.server')
    
        const serviceHandler: PopularityService.IHandler<express.Request> = {
            getPopularityByProduct(id: number, context?: express.Request): Popularity {
                const popularity: IMockPopularity | undefined = findPopularity(id)
                if (popularity !== undefined) {
                    return new Popularity({
                        id: popularity.id,
                        totalStars: popularity.totalStars,
                         review: popularity.review,
                         productId:popularity.productId,
                    })
                } else {
                    throw new PopularityServiceException({
                        message: `Unable to find poplarity for id[${id}]`,
                    })
                }
            },
        }
    
        app.use(
            serverConfig.path,
            bodyParser.raw(),
            ThriftServerExpress({
                serviceName: 'popularity-service',
                handler: new PopularityService.Processor(serviceHandler),
            }),
        )
    
        app.listen(serverConfig.port, () => {
            console.log(`Thrift server listening at http://${serverConfig.hostName}:${serverConfig.port}`)
        })
   }   
}
PopularityServer.createPopularityServer();

export  {PopularityServer}
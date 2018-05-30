import {config} from '@creditkarma/dynamic-config';
import {createHttpClient} from '@creditkarma/thrift-client';
import {ThriftServerExpress} from '@creditkarma/thrift-server-express';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import {findProduct,IMockProduct} from './data';
//mock data can be replaced with real database.
import {Popularity,PopularityService} from '../codegen/com/popularity/PopularityService';
import {ProductService,ProductServiceException,Product} from '../codegen/com/product/ProductService'

class ProductThriftServer{
    constructor(){
        ProductThriftServer.startProductServer();
    }
    static async startProductServer(){
    const app: express.Application = express()
    const serverConfig = await config().get('product.server')
    const clientConfig = await config().get('product.client')

    const popularityClientV1: PopularityService.Client = createHttpClient(PopularityService.Client, clientConfig)
    const serviceHandler: ProductService.IHandler<express.Request> = {
        getProduct(id: number, context?: express.Request): Promise<Product> {
            console.log(`ContentService: getProduct[${id}]`)
            const product: IMockProduct | undefined = findProduct(id)
            if (product !== undefined) {
                return popularityClientV1.getPopularityByProduct(product.id).then((popularity: Popularity) => {
                    return new Product({
                        id: product.id,
                        feedback:popularity,
                        productInfo: product.productInfo,
                        productType: product.productType,
                    })
                })
            } else {
                throw new ProductServiceException({
                    message: `Unable to find product for id[${id}]`,
                })
            }
        },
    }

    app.use(
        serverConfig.path,
        bodyParser.raw(),
        ThriftServerExpress({
            serviceName: 'product-service',
            handler: new ProductService.Processor(serviceHandler),
        }),
    )

    app.listen(serverConfig.port, () => {
        console.log(`Thrift server listening at http://${serverConfig.hostName}:${serverConfig.port}`)
    })
    }
}

ProductThriftServer.startProductServer();
export {ProductThriftServer};

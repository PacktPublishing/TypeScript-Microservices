import {config} from '@creditkarma/dynamic-config'
import {createHttpClient} from '@creditkarma/thrift-client'
import * as express from 'express'
import {ProductService,Product} from '../codegen/com/product/ProductService';

 class APIGateway{
    constructor(){
        APIGateway.createAPIServer();
    }
    static async createAPIServer(){
        const app: express.Application = express()
    const serverConfig = await config().get('gateway.server')
    const clientConfig = await config().get('gateway.client')

    // SET UP CLIENT

    const productClient: ProductService.Client = createHttpClient(ProductService.Client, clientConfig)

    // START API SERVER

    app.get('/healthcheck', (req, res) => {
        res.send('success')
    })

    app.get('/product/:id', (req, res) => {
        console.log(`Gateway: fetching prodict with id: ${req.params.id}`)
        productClient.getProduct(req.params.id).then((product: Product) => {
            res.send(product)
        }, (err: any) => {
            res.send(err).status(500)
        })
    })

    app.listen(serverConfig.port, () => {
        console.log(`Web server listening at http://${serverConfig.hostName}:${serverConfig.port}`)
    })
    }
}

APIGateway.createAPIServer();
export {APIGateway};
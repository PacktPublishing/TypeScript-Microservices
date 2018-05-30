export const gateway = {
   //server is where the gateway runs, it consumes response from productservice.
    server: {
        hostName: 'localhost',
        port: 9000,
        path: '/',
    },
   //from where we are going to get product data. 
    client: {
        hostName: 'localhost',
        port: 8095,
        path: '/',
    },
}

export const product = {
    server: {
        hostName: 'localhost',
        port: 8095,
        path: '/',
    },
    client: {
        hostName: 'localhost',
        port: 8085,
        path: '/',
    },
}

export const identity = {
    server: {
        hostName: 'localhost',
        port: 8085,
        path: '/',
    },
}

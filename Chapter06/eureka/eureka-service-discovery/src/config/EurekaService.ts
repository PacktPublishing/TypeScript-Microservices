import { Service } from "typedi";
import { Eureka } from "eureka-js-client";
import * as config from 'config';

export class EurekaService{

    private static _client:Eureka;
    private static _port:number=4000;

    constructor(){}

    static getClient():Eureka{
        if(!this._client){
            this._client=new Eureka({
                instance: {
                  app: 'service-consumer',
                  instanceId:'2',
                  hostName:'test',
                  preferIpAddress : true,
                  ipAddr: '127.0.0.1',
                  statusPageUrl: `http://localhost:${this._port}`,
                  healthCheckUrl: `http://localhost:${this._port}/health`,
                  port: {
                    '$': this._port,
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
                  fetchRegistry:true
                }
              })
        }
       return this._client;  
    }

}
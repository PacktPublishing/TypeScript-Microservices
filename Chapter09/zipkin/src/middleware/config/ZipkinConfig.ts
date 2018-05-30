import {Tracer} from 'zipkin';
import {BatchRecorder} from 'zipkin';
import {HttpLogger} from 'zipkin-transport-http';
const CLSContext = require('zipkin-context-cls');


export const ctxImpl=new CLSContext('typescript-microservices');
    const logRecorder=new BatchRecorder({
      logger:new HttpLogger({
        endpoint:`http://localhost:9411/api/v1/spans`
      })
    })

export const tracer=new Tracer({ctxImpl:ctxImpl,recorder:logRecorder});
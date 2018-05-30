
export function hystrixStream (circuitBreaker:any) {
    return (request:any, response:any) => {
      response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'});
      response.write('retry: 10000\n');
      response.write('event: connecttime\n');
  
      circuitBreaker.stats.pipe(response);
    };
  }
  
import axios from 'Axios';

export class RetryRequest{
    constructor(){}
    
    wait(timeout:number){
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve()
            }, timeout)
          })
    }

    async requestWithRetry(url:string){
        const MAX_RETRIES = 10
        for (let i = 0; i <= MAX_RETRIES; i++) {
          try {
            return await axios.get(url);
          } catch (err) {
            const timeout = Math.pow(2, i)
            console.log('Waiting', timeout, 'ms')
            await this.wait(timeout)
            console.log('Retrying', err.message, i)
          }
        }
    }
}

let a=new RetryRequest();
a.requestWithRetry('https://localhost:8081/news/get-news-list');
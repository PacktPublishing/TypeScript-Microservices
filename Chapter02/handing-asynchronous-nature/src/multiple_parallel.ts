import axios from 'Axios';

async function executeParallelAsyncTasks () {
    const [ valueA, valueB, valueC ] = await 
                Promise.all([ await axios.get('https://jsonplaceholder.typicode.com/posts/1'), 
                              await axios.get('https://jsonplaceholder.typicode.com/posts/2'), 
                              await axios.get('https://jsonplaceholder.typicode.com/posts/3') ])
    console.log("first response is ",valueA.data);
    console.log(" second response is ",valueB.data);
    console.log("third response is ",valueC.data);
  }
  executeParallelAsyncTasks();
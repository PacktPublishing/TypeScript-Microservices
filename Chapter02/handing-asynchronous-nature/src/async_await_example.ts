import axios from 'Axios';

const asyncDemo1 = async () => {
    console.log("simple async call");
    let asyncReq1=await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(asyncReq1.data);
    let asyncReq2=await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(asyncReq2.data);
}

asyncDemo1();



//map,filter,reduce.
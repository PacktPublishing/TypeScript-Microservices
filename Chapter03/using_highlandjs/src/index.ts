import * as highland from "highland";
import { Stream } from "stream";
import * as fs from "fs";

var readFile =highland.wrapCallback(fs.readFile);
console.log("started at",new Date());

var filenames = highland(['file1.txt', 'file2.txt', 'file3.txt']);
filenames
.map(readFile)
.parallel(10) //reads up to 10 times at a time
.errors((err:any,rethrow:any)=>{
    console.log(err);
    rethrow();
})
.each((x:Stream)=>{
console.log("---");
console.log(x.toString());
console.log("---");
});
console.log("finished at",new Date());

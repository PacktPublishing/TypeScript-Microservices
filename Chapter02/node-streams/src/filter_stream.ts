import { Transform } from "stream";
//we create Custom transform and export it, so it can be used anywhere

export class FilterTransform extends Transform {
private filterProps:Array<String>;
 
/*Options is not given mandatory, if they aint passed, we create default options */
constructor(filterprops:Array<String>,options?:any){
   if (!options) options = {}; 
   /*
   By default, streams expect Buffer/String values. 
   There is an objectMode flag that we have to set in the stream  
   so it can accept any JavaScript object.
   */
   options.objectMode = true; 
   super(options);   
   this.filterProps=filterprops;
  }
//override the transform method to suit it to our needs
  _transform(chunk: any, encoding?: string, callback?: Function){
   
    //we remove those keys which are passed out in filter options
    let filteredKeys=Object.keys(chunk).filter((key)=>{
      return this.filterProps.indexOf(key)==-1;
    });

    //we create the filtered object
    let filteredObj=filteredKeys.reduce((accum:any,key:any)=>{
      accum[key]=chunk[key];
      return accum;
    },{})
           
    this.push(filteredObj);
    callback();
 }
  
 //this method is called out at the end of all transformations.
 _flush(cb:Function){
   console.log("this method is called at the end of all transformations");
 }

}


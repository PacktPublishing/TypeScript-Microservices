import * as Rx from "Rxjs/Rx";

/*
forkjoin : When we have group of observables and we want only the last value. 
This cannot be used if one of the observable never completes
*/
let example=Rx.Observable.forkJoin(
    Rx.Observable.of('Hello'),
    Rx.Observable.of("Typescript Microservices").delay(500),
    Rx.Observable.throw("Throwing Error")
).catch(err=>Rx.Observable.of(err));

let subscribe=example.subscribe(emittedValue=>console.log(emittedValue));

/*
combineAll: It justs flattens/combines an observable of Observables by waiting for outer
observable to complete and then automatically applying CombineLatest
*/
let example2Src=Rx.Observable.interval(1000).take(2);
let example2=example2Src.map(val=>Rx.Observable.interval(1000)
                                   .map(i=>`Result (${val}): ${i}`)
                                    .take(5))
let combined=example2.combineAll();                                    
const subscribe2 = combined.subscribe(val => console.log(val));

/*
race: The observable whose value is emitted first will be used.
*/
let example3=Rx.Observable.race(
    Rx.Observable.interval(2000).mapTo("i am first obs"),
    Rx.Observable.of(1000).mapTo("i am second"),
    Rx.Observable.interval(1500).mapTo("i am third")
)
let subscribe3=example3.subscribe(val=>console.log(val));


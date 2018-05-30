import * as Rx from "Rxjs/Rx";
/*
retry: Retries an observable sequence a specific number of times should an error occur.
*/
const source1 = Rx.Observable.interval(1000);
const example1 = source1.flatMap(val => {
    if (val > 5) {return Rx.Observable.throw('Error!');}
    return Rx.Observable.of(val);
  })
  .retry(2);
const subscribe1 = example1.subscribe({
  next: val => console.log(val),
  error: val => console.log(`${val}: Retried 2 times then quit!`)
});


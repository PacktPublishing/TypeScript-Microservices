import * as Rx from "Rxjs/Rx";

/**
 Debounce:Ignore emitted values that take less than specified time. 
 Example if we set debounce on 1 second, than any values which are emitted before 1 second
 will be ignored
 */
const example = Rx.Observable.of('before 1 sec', 'before 1 sec', 'before 1 sec','before 1 sec', 'After 1 sec');
const debouncedExample = example.debounce(() => Rx.Observable.timer(1000));
const subscribe = debouncedExample.subscribe(val => console.log(val));

/**
Throttle: Emit value only when duration, determined by provided function, has passed.
 */
const source = Rx.Observable.interval(1000);
const example2 = source.throttle(val => Rx.Observable.interval(2000));
const subscribe2 = example2.subscribe(val => console.log(val));
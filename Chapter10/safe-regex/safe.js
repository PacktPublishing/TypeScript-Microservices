let safe=require('safe-regex');
let regex=process.argv.slice(2).join(' ');
console.log(safe(regex));


//sample tests.
console.log(safe('(x+x+)+y'));
console.log(safe('(beep|boop)*'));
console.log(safe('(a+){10}'));
console.log(safe('\blocation\s*:[^:\n]+\b(Oakland|San Francisco)\b'));

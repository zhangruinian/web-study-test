// [func1, func2].reduce((p, f) => p.then(f), Promise.resolve())

let applyAsync = (acc,val) => acc.then(val);
let composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));

// es7

/*
for (let f of [func1, func2]) {
    await f();
}*/


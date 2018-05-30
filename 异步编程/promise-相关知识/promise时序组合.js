// [func1, func2].reduce((p, f) => p.then(f), Promise.resolve())

let applyAsync = (acc,cur) => acc.then(cur);
let composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));


// es7

/*
for (let f of [func1, func2]) {
    await f();
}*/


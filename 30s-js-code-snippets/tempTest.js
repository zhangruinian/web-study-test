/*
// const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
const runPromisesInSeries = ps => {
    return ps.reduce((p, next) => {
        return p.then(next)
    }, Promise.resolve())
}
// const delay = (d) => new Promise(r => setTimeout(r, d))
// runPromisesInSeries([() => delay(1000), () => delay(2000)])
var delay1 = function(time){
    return new Promise((log) =>{
        setTimeout(log, time)
        console.log(time)
    })
    
}
runPromisesInSeries([() => delay1(3000), () => delay1(2000)]).then((result) =>{
    console.log(result)
    console.log('几秒执行')
})*/
var sleep = ms => {
    return new Promise((resolve,reject) => {
        setTimeout(resolve, ms)
    })
}
;(async function sleepyWork() {
  console.log('I\'m going to sleep for 1 second.');
  await sleep(1000);
  console.log('I woke up after 1 second.');
})()
/*
var a = 1;
(function () {
    console.log(a)
})()*/

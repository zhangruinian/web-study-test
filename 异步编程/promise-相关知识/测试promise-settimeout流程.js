Promise.resolve()
    .then(() => {
        console.log(1)
        Promise.resolve().then(() => {console.log(2)})
    })

setTimeout(() => {console.log(3)},0)
console.log(4)

//打印结果 4 1 2 3

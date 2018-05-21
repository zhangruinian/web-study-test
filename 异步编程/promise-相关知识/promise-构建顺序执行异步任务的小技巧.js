var sequence = Promise.resolve()
array.forEach(function (item) {
    sequence = sequence.then(() =>{
        //deal item
    })
})

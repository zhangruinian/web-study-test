function shuffle(arr) {
    for (let i = arr.length; i > 0; i--){
        let j = Math.floor(Math.random() *i);
        [arr[i-1], arr[j]] = [arr[j], arr[i-1]]
    }
    return arr
}

console.log(shuffle([1,2,3,4,5,6,7]))
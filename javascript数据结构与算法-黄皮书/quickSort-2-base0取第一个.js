// 快排的原理
// 对于一个数组，从中随机选择一个数字（一般选取第一个），然后把整个数组中小于它的元素放在左侧，大于它的元素放在右侧，然后递归执行。
// 但是在排序过程中，有可能会导致相同元素的顺序发生改变，从而是不稳定的。教课书上的写法就是这样，所以是不稳定的。
/**
 *
 * @param {Array} arr
 * @returns {Array}
 */
var quickSort =  function (arr) {
    if (arr.length <= 1){
        return arr
    }
    /*var pivotIndex = Math.floor(arr.length/2)
    var pivot = arr.splice(pivotIndex, 1)[0]*/
    var pivot = arr[0]
    var left = []
    var right = []
    // for (var i =0; i < arr.length; i++){
    for (var i =1; i < arr.length; i++){
        // 判决条件会影响稳定性
        /*if (arr[i] < pivot){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }*/
        if (arr[i] >= pivot){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}

function createNonSortedArray (size) {
    var array = []
    for (var i = size; i > 0; i--) {
        array.push(Math.round(Math.random() * 1000))
    }
    return array
}

// var test1 = createNonSortedArray(3)
var test1 = [1,2,1,0]
var temp = test1.slice()

console.log('初始数组 ' +　temp)
console.log('排序数组 ' + quickSort(test1))
console.log('之后数组 ' + test1)
console.log(temp == test1)
// 快速排序也许是最常用的排序算法了。它的复杂度为O(nlogn)，且它的性能通常比其他的复杂度为O(nlogn)的排序算法要好
var quickSort =  function (arr) {
    if (arr.length <= 1){
        return arr
    }
    // var pivotIndex = Math.floor(arr.length/2)
    /*splice的目的是将取“中心”元素的值之后将原数组中该值删除，
    这样下面的for循环的时候是不会循环中心元素了。[22, 21, 23, 12, 1, 242]比如，这样splice之后原来的数组就是[22, 21, 23, 1, 242]。*/
    //获得基准，并把基准从原数组删除
    // var pivot = arr.splice(pivotIndex, 1)[0]
    var pivot = arr[0]
    var left = []
    var right = []
    // for (var i =0; i < arr.length; i++){
    for (var i =1; i < arr.length; i++){
        if (arr[i] < pivot){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}

function createNonSortedArray (size) {
    var array = []
    for (var i = size; i > 0; i--) {
        // array.insert(i)
        array.push(Math.round(Math.random() * 30))
    }
    return array
}

var test1 = createNonSortedArray(50)
console.log('初始数组 ' +　test1)
console.log('排序数组 ' + quickSort(test1))
console.log('之后数组 ' + test1)
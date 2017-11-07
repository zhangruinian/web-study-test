function ArrayList () {
    var array = []
    this.insert = function (item) {
        array.push(item)
    }

    this.toString = function () {
        return array.join()
    }
    // 默认排序都是从小到大

    // 冒泡排序 最简单 从运行时间角度看最差
    var swap = function (index1, index2) {
        var aux = array[index1]
        array[index1] = array[index2]
        array[index2] = aux
    }

    this.bubbleSort = function () {
        var length = array.length
        // 外循环 控制数组经过多少轮排序 数组每项都经过一轮, 轮数和数组长度一致
        for (var i = 0; i < length; i++) {
            // 内循环 第一位到倒数第二位 当前项和下一项的比较 j-1 -i 做了优化,减去内循环中已跑过论述,避免内循环中不必要的比较
            for (var j = 0; j < length - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    swap(j, j + 1)
                }
            }
        }
    }
    // 选择排序
    this.selectionSort = function () {
        var length = array.length,
            indexMin = null
        for (var i =0; i < length -1; i++){
            indexMin = i
            for (var j =i; j < length; j++){
                if(array[indexMin] > array[j]){
                    indexMin = j
                }
            }
            if(i !== indexMin){
                swap(i, indexMin)
            }
        }
    }

    // firefox 归并排序  分治法 也是递归的  每当实现一个递归函数 都会实现一个实际被执行的辅助函数, mergeSort以供随后调用
    this.mergeSort = function () {
        array = mergeSortRec(array)
    }
    /**
     * [交换排序递归]
     * @param {Array}array
     * @returns {*}
     * @desc jsdoc使用
     * @example
     * @extends A 但是并不能找到A
     * @typedef
     */
    var mergeSortRec = function (array) {
        var length = array.length
        if(length ===1){
            return array
        }
        var mid = Math.floor(length/2) // 取地板 底部   ceil 天花板
        left = array.slice(0, mid)
        right = array.slice(mid, length)

        return merge(mergeSortRec(left), mergeSortRec(right))
    }
    var merge = function (left, right) {
        var result = []
            // TODO: 未完 归并 这样完 while没有for容易理解
    }

    // 快速排序 快排 图灵奖得主1960年提出
    this.quickSort = function() {
      //    直接单独写出在其他js
    }
}

function createNonSortedArray (size) {
    var array = new ArrayList()
    for (var i = size; i > 0; i--) {
        // array.insert(i)
        array.insert(Math.round(Math.random() * 100))
    }
    return array
}

var array1 = createNonSortedArray(5)
// 此时的tostring和inset都是实例化的类的方法 并不是原生数组的方法
console.log('随机数组 ' + array1.toString())

/*array1.bubbleSort()
console.log('buble sort ' + array1.toString())*/

array1.selectionSort()
console.log('selection sort ' + array1.toString())

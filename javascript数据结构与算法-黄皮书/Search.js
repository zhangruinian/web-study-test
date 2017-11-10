// 顺序/线性搜索最基本的搜索算法 机制:将每一个数据结构中的元素和我们要找的元素做比较 最低效的搜索算法
var array = [1,3,5]

// for循环进行比较然后返回true 当前项等 新的es6中已经有find等方便的方法 indexOf

// 二分搜索 要求被搜索的数据结构已经排序

/*
(1) 选择数组的中间值。
(2) 如果选中值是待搜索值，那么算法执行完毕（值找到了）。
(3) 如果待搜索值比选中值要小，则返回步骤1并在选中值左边的子数组中寻找。
(4) 如果待搜索值比选中值要大，则返回步骤1并在选种值右边的子数组中寻找
*/

this.binarySearch = function(item){
    this.quickSort(); //{1}
    var low = 0, //{2}
        high = array.length - 1, //{3}
        mid, element;
    while (low <= high){ //{4}
        mid = Math.floor((low + high) / 2); //{5}
        element = array[mid]; //{6}
        if (element < item) { //{7}
            low = mid + 1; //{8}
        } else if (element > item) { //{9}
            high = mid - 1; //{10}
        } else {
            return mid; //{11}
        }
    }
    return -1; //{12}
};



> 30s之内可以理解的有用的js代码片段,原文基础上增加了部分其它代码,进行了小幅度修改,便于阅读
注意箭头函数有无`{}`会影响是否需要再return

[原文地址](https://chalarangelo.github.io/30-seconds-of-code/#capitalizeeveryword)
## Array
### 数组最大值
`Math.max()`和扩展操作符`...`
```js
    const arrayMax = arr => Math.max(...arr)
```
### 数组中去除`假值`

```js
    const compact = arr => arr.filter(Boolean)
```
### 统计某项出现的次数
```js
    const countOccurrences = (arr, value) => {
        return arr.reduce((a,v) =>{
            return v  === value ? a + 1: a + 0
        },0)
    }
```
### 统计数组元素出现次数
```js
    const countedNames = (arr) => {
        return arr.reduce(function (accr, name) {
            if (name in accr) {
                accr[name]++;
            }
            else {
                accr[name] = 1;
            }
            return accr;
        }, {});
    }
    // countedNames is:
    // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```
### 深度扁平(map)
利用`Array.concat()`和`...`扩展操作符以及递归
 ```js
    const deepFlatten = arr => {
        return [].concat(...arr.map((v) =>{
            return Array.isArray(v) ? deepFlatten(v) : v
        }))
    }
```
### 找出两个数组的不同项
利用`set.has()`和`filter`
```js
    const difference = (arr1, arr2) =>{
        const s = new Set(arr2)
        return arr1.filter(x => !s.has(x))
    }
```
### 去重
```js
    const distinct = arr => [...new Set(arr)]
    const distinct = arr => [Array.from(new Set(arr))]
    const distinct = arr => {
        return arr.filter((i) => arr.indexOf(i) !== arr.lastIndexOf(i))
    }
```
### 过滤非唯一值
```js
    const filterNonUnique = arr =>{
        return arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i))
    }
```
### 扁平一层(reduce)
```js
    const flatten = arr => arr.reduce((a, v) => a.concat(v), [])
```
### 扁平等级(depth)
根据depth等级来扁平,默认为1
```js
    const flattenDepth = (arr, depth = 1) =>{
        if (depth ===1) {
        return arr.reduce((a, v) => a.concat(v), [])
        }
        return  arr.reduce((a, v) => {
            return a.concat(Array.isArray(v) ? flattenDepth(v, depth-1) : v)
        }, [])
    }
```
### 根据范围填充
默认0到end
```js
    const initialWithRange = (end, start = 0) =>{
        return Array.from({length:end + 1 - start}).map((v, i) =>{
            return i + start
        })
    }
    const initialWithRange = (end, start = 0) =>{
        return new Array(end + 1 - start).fill().map((v, i) =>{
            return i + start
        })
    }
```
### 两个数组的交叉值
```js
 const intersection = (arr1, arr2) =>{
    const s = new Set(arr2)
    return arr1.filter((x) => s.has(x))
 }
```
### 挑选(pick)
从对象中挑选与给定键对应的键值对。
```js
    const pick = (obj, arr) =>
      arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
    const pick = (obj, arr) => {
        return arr.reduce((acc, curr) => {
            curr in obj && (acc[curr] = obj[curr])
            return acc
        }, {})
    }
    // 本质,遍历检查一遍
    const pick = (obj, arr) => {
        var temp = {}
        arr.forEach((item, index) => {
            if (item in obj){
                temp[item] = obj[item]
            }
        })
        return temp
    }
```
### 随机取数(sample)
同时也适用于字符串
```js
    const sample = arr =>{
        return arr[Math.floor(Math.random()*arr.length)]
    }
```
### 打乱(shuffle)
```js
// 初级版
    const shuffle = arr => arr.sort(() => Math.random() - 0.5)
// random order
    function shuffle(array) {
        var random = array.map(Math.random)
        return array.sort(function(a, b) {
            return random[a] - random[b]
        })
    }
// Fisher–Yates(费歇尔洗牌算法)
    function shuffle(arr) {
        for (let i = arr.length; i > 0; i--){
            //下面一行的';'不可去掉,否则会报错
            let j = Math.floor(Math.random() *i);
            [arr[i-1], arr[j]] = [arr[j], arr[i-1]]
        }
        return arr
    }
```
### 相似值
```js
 const similarity = (arr1, arr2) =>{
    return arr1.filter((item, i) => {
        return arr2.includes(item)
    })
 }
 // similarity([1,2,3], [1,2,4]) -> [1,2]
```
### 联合(union)
```js
    const  union = (arr1, arr2) => Array.from(new Set([...arr1, ...arr2]))
    // union([1,2,3], [4,3,2]) -> [1,2,3,4]
```

### 排除
支持多参数传入,利用`...`剩余操作符,不修改原数组
```js
    const without = (arr, ...args) =>{
        return arr.filter((item) =>{
            return !args.includes(item)
        })
    }
    // without([2, 1, 2, 3], 1, 2) -> [3]
```
### 降维/压缩
`...rest`参数.根据原始数组中的位置进行分组,多个一维数组,按照原始位置进行合并为二维数组,空缺的用undefined占位
```js
    const zip = (...arrays) => {
         // 下面的...是扩展操作符,不然数组无法传入到Math.max()
         const maxLength = Math.max(...arrays.map((item) => item.length))
         return Array.from({length:maxLength}).map((_, i) =>{
             return Array.from({length: arrays.length},(_, j) =>{
                 return arrays[j][i]
             })
         })
     }
     //zip(['a', 'b'], [1, 2], [true, false]); -> [['a', 1, true], ['b', 2, false]]
     //zip(['a'], [1, 2], [true, false]); -> [['a', 1, true], [undefined, 2, false]]
```
## Browser

### 页面底部是否可见
```js
    const bottomVisible = () => {
        return document.documentElement.clientHeight + window.scrollY >=  (document.documentElement.scrollHeight || document.documentElement.clientHeight)
    }
```
### 元素是否在视窗可见
默认完全可见,懒加载的时候会用到这个原理
```js
    const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
      const { top, left, bottom, right } = el.getBoundingClientRect();
      return partiallyVisible
        ? ((top > 0 && top < window.innerHeight) || (bottom > 0 && bottom < window.innerHeight)) &&
          ((left > 0 && left < window.innerWidth) || (right > 0 && right < window.innerWidth))
        : top >= 0 && left >= 0 && bottom <= window.innerHeight && right <= window.innerWidth;
    };
```




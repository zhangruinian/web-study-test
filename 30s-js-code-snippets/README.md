> 原文基础上增加了其它方法以及注释等,进行了小幅度修改,便于阅读
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
### 获取url查询参数
```js
    const getURLParameters = url =>
        url.match(/([^?=&]+)(=([^&]*))/g).reduce(
            (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
        );
```
### 返回页面顶部
```js
    const scrollToTop = () =>{
        const distance = document.documentElement.scrollTop
        if(distance > 0){
            window.requestAnimationFrame(scrollToTop)
            window.scrollTo(0, distance - distance/8)
        }
    }
```
### 浏览器窗口大小(视窗)
> 一张网页的全部面积，就是它的大小。通常情况下，网页的大小由内容和CSS样式表决定。
浏览器窗口的大小，则是指在浏览器窗口中看到的那部分网页面积，又叫做viewport（视口）。

注意事项
* 必须在页面加载完成后才能运行，否则document对象还没生成，浏览器会报错
* clientWidth和clientHeight都是只读属性，不能对它们赋值。
* window.innerWidth是包括右边滚动条的宽度的
```js
    const getViewport = () =>{
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
```
### 网页大小
> 如果网页内容能够在浏览器窗口中全部显示，不出现滚动条，那么网页的clientWidth和scrollWidth应该相等。但是实际上，不同浏览器有不同的处理，这两个值未必相等。所以，我们需要取它们之中较大的那个值
```js
    const getPageArea = () =>{
        return {
            width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
            height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
         }
    }
```
### 网页元素绝对位置
> 指该元素的左上角相对于整张网页左上角的坐标。这个绝对位置要通过计算才能得到。

1. 不断累加offsetParent的offsetTop和offsetLeft属性
    
    由于在表格和iframe中，offsetParent对象未必等于父容器，所以上面的函数对于表格和iframe中的元素不适用。
    ```js
       function getElementLeft(element){
           var actualLeft = element.offsetLeft;
           var current = element.offsetParent;
       
           while (current !== null){
               actualLeft += current.offsetLeft;
               current = current.offsetParent;
           }
           return actualLeft;
       }
       function getElementTop(element){
           var actualTop = element.offsetTop;
           var current = element.offsetParent;
       
           while (current !== null){
               actualTop += current.offsetTop;
               current = current.offsetParent;
           }
           return actualTop;
       }
    ```
2. 利用`getBoundingClientRect`方法

    此方法其中包含了left、right、top、bottom四个属性，分别对应了该元素的左上角和右下角相对于浏览器窗口（viewport）左上角的距离.(其实也就是网页元素的相对位置)
    ```js
       　var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft;
       
       　var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;
    ```
### 网页元素相对位置
> 网页元素的相对位置，指该元素左上角相对于浏览器窗口左上角的坐标。  

有了绝对位置以后，获得相对位置就很容易了，只要将绝对坐标减去页面的滚动条滚动的距离就可以了 也就是减去`document.documentElement.scrollLeft|scrollTop`
```js
    //快捷方法
    var X= this.getBoundingClientRect().left;
    
　　 var Y =this.getBoundingClientRect().top;
```
## Function

### 链式异步调用(chainAsync)
循环遍历包含异步事件的函数数组，每次异步事件完成后再调用
```js
    const chainAsync = fns =>{
        let curr = 0
        const next = () =>{
            fns[curr++](next)
        }
        next()
    }
    /*
    chainAsync([
        next => { console.log('0 seconds'); setTimeout(next, 1000); },
        next => { console.log('1 second');  setTimeout(next, 1000); },
        next => { console.log('2 seconds'); }
    ])
    */
```
### 组合
执行从右到左的函数功能组合

使用Array.reduce（）来执行从右到左的函数组合。最后（最右边的）函数可以接受一个或多个参数;其余的函数参数必须是一元的.
```js
    const compose = (...fns) => {
        return fns.reduce((f,g) => {
            //...args 剩余参数, args是数组,再转换为函数参数
            return (...args) => f(g(...args))
        })
    }
    /*
    const add5 = x => x + 5
    const multiply = (x, y) => x * y
    const multiplyAndAdd5 = compose(add5, multiply)
    multiplyAndAdd5(5, 2) -> 15
    */
```
### 管道
执行从左到右的函数功能组合

使用Array.reduce（）和spread运算符（...）来执行从左到右的函数组合。第一个（最左边的）函数可以接受一个或多个参数;其余的功能必须是一元的。

```js
   const pipeFunctions  = (...fns) => {
       return fns.reduce((f,g) => {
           //...args 剩余参数, args是数组,再转换为函数参数
           return (...args) => g(f(...args))
       })
   }
    /*
    
    */
```
### promise化(promisify)
转换异步函数以返回一个promise。相当于node的[util.promisify](https://nodejs.org/api/util.html#util_util_promisify_original)
使用currying返回一个函数，返回一个调用原始函数的Promise。使用... rest运算符传入所有参数。

```js
    const promisify = func => {
        return (...args) =>{
            return new Promise((resolve, reject) => {
                return func(...args,(err,result) =>{
                    return err ? reject(err) : resolve(result)
                })
            })
        }
    }
```
### 链式调用promise
使用Array.reduce（）创建一个promise链，每个promise在解析后返回下一个promise

```js
    const promiseSeries = ps => {
        return ps.reduce((p, next) => {
            return p.then(next)
          }, Promise.resolve())
    }
    // const delay = (d) => new Promise(r => setTimeout(r, d))
    // runPromisesInSeries([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete
```
### 睡眠(sleep)
延迟异步函数的执行,延迟执行异步函数的一部分，通过把它放到睡眠状态，返回一个Promise。
```js
    const sleep = ms => {
        return new Promise((resolve,reject) => {
            setTimeout(resolve, ms)
        })
    }
    /*
    async function sleepyWork() {
      console.log('I\'m going to sleep for 1 second.');
      await sleep(1000);
      console.log('I woke up after 1 second.');
    }
    */
```
## Math
### 数组总和
```js
    const arraySum = arr => {
        return arr.reduce((acc,curr) => {
            return acc + curr
        },0)
    }
```
### 数组平均数
```js
    const arrayAverage = arr => {
        return arr.reduce((acc,curr) => {
            return acc + curr
        },0) / arr.length
    }
```
### 数字数组化
```js
    const digitize = number =>{
        return [...number.toString()]
        // return [...''+number]
    }
```
### 阶乘
```js
    const factorial
```
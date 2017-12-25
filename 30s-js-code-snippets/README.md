> 原文基础上增加了其它方法以及注释等,进行了小幅度修改,便于阅读
注意箭头函数有无`{}`会影响是否需要再return

[原文地址](https://chalarangelo.github.io/30-seconds-of-code/#capitalizeeveryword)
## Adapter
适配器,以下大多利用闭包返回函数和...操作符(剩余操作符/扩展操作符)
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
    // const delay = promisify((d, cb) => setTimeout(cb, d))
    // delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s
```
### 可变参数函数转为数组参数函数
接受一个可变参数函数并返回一个闭包，该闭包接受一个参数数组映射到该函数的输入。 使用闭包和展开运算符（...）将参数数组映射到函数的输入。
```js
    const spreadOver = fn =>{
        return argsArr =>{
            return fn(...argsArr)
        }
    }
    /*
    const arrayMax = spreadOver(Math.max)
    arrayMax([1,2,3]) // -> 3
    arrayMax([1,2,4]) // -> 4
    */
    // 简单点可以
    // Math.max(...[1,3,5])
```

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
### 侦测设备类型
移动设备/桌面设备
```js
    const detectDeviceType = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
    }
    // detectDeviceType() -> "Desktop"
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
### 滚动位置
返回当前页面的滚动位置。请使用pageXOffset和pageYOffset， 如果已定义，否则使用scrollLeft和scrollTop。你可以省略el来使用窗口的默认值。pageXOffset是scrollY的别名(event.pageX是鼠标活动事件的属性)
```js
    const getScrollPosition = (el = window) =>{
        return ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft, y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop});
    }
      
    // getScrollPosition() -> {x: 0, y: 200}
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
    // digitize(2334) -> [2, 3, 3, 4]
```
### 阶乘(factorial)
```js
    // 一个函数内处理的结果可以使用return 返回，这样在调用函数的地方就可以用变量接收返回
       结果
    const factorial = n =>{
        // 不return的话那就不会返回这个数值 默认返回的是undefined
        return n <= 1 ? 1 : n * factorial(n-1)
    }
    // factorial(6) -> 720
```
### 斐波那契数列(fibonacci)
```js
    const fibonacci = n =>{
        return Array(n).fill(0).reduce((acc, val, i) =>{
            return acc.concat(i >1 ? acc[i -1] + acc[i -2] : i) 
        }, [])
    }
    // fibonacci(5) -> [0,1,1,2,3]
```
### 判断素数

```js
    const isPrime = num =>{
        for (var  i = 2; i < num; i++) {
            if (num % i ===0){
                return false
            }
        }
        return num >= 2;
    }
    // isPrime(11) -> true
    // isPrime(12) -> false
    // isPrime(1) -> false
```
### 判断回文
```js
    const palindrome = str =>{
        const s = str.toLowerCase().replace(/[\w_]/g, '')
        return s === s.split("").reverse().join('')
    }
    // palindrome('taco cat') -> true
```
### 指定范围随机整数
```js
    const randomIntegerRange = (min, max) =>{
        return Math.floor(Math.random()* (max - min +1)) + min
    }
    //randomIntegerRange (1, 10) -> 5
```
### 四舍五入到指定小数位
````js
    const roundx = (n, decimals=0) => {
      return Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
    }
    // roundx(1.005, 2) -> 1.01
    const roundx = (n, decimals=0) =>{
        return n.toFixed(decimals)
    }
    // roundx(1.2, 3)  -> "1.200"
````
### 数组标准差
```js
    const standardDeviation = (arr, usePopulation = false) => {
      const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
      return Math.sqrt(
        arr.reduce((acc, val) => acc.concat(Math.pow(val - mean, 2)), [])
           .reduce((acc, val) => acc + val, 0) / (arr.length - (usePopulation ? 0 : 1))
      );
    };
    // standardDeviation([10,2,38,23,38,23,21]) -> 13.284434142114991 (sample)
```
## Media

### 语言转文字(读取文字)
了解有关Web Speech API的[SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)接口的更多信息。
```js
    const speechSynthesis = message => {
      const msg = new SpeechSynthesisUtterance(message);
      msg.voice = window.speechSynthesis.getVoices()[0];
      window.speechSynthesis.speak(msg);
    };
    // speechSynthesis('Hello, World') -> plays the message
```
## Object
### 给定数组创建对象
```js
    const objectFromPairs =  arr => {
        return arr.reduce((acc, val) =>{
            acc[val[0]] = val[1]
            return acc
            // return (acc[val[0]] = val[1], acc)
        },{})
    }
    // objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}
```
### 给定对象创建数组
```js
    const objectToPairs = obj =>{
        return Object.keys(obj).map((key) =>{
            return [key, obj[key]]
        })
    }
    // objectToPairs({a: 1, b: 2}) -> [['a',1],['b',2]])
```
### 对象深度选择(select)
可以避免深度对象选择不到时的报错?
```js
    const select = (from, selector) =>{
        return selector.split('.').reduce((prev,cur) =>{
            return prev && prev[cur]
        },from)
    }
     // const obj = {selector: {to: {val: 'val to select'}}};
     // select(obj, 'selector.to.val'); -> 'val to select'
```
### 对象组是否都含有给定的属性
```js
    const truthCheckCollection = (collection, key) =>{
        return collection.every((obj => {
            return obj[key]
        }))
    }
    // truthCheckCollection([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}], "sex") -> true
```
## String
### 首字母大写(capitalize)
```js
    const capitalize = ([first, ...rest]) =>{
        return first.toUpperCase() + rest.join('')
    }
   // capitalize('myName') -> 'MyName'
```
### 首字母大写每个单词
```js
    const capitalizeEveryWord = str =>{
        // 匹配的单词
        return str.replace(/\b[a-z]/g, char =>{
            return char.toUpperCase()
        })
    }
```
### 元音字符数
```js
    const countVowels = str => {
        // 匹配不到时返回null 所以用[]避免报错
        return (str.match(/[aeiou]/ig) || []).length
    }
```
#### 转义字符串
转义字符串以在正则表达式中使用。 使用replace（）来转义特殊字符。
```js
    const escapeRegExp = str =>{
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }
```
### 转换驼峰字符串
将驼峰形式的字符串转换为指定字符分割的形式
```js
    const fromCamelCase = (str, separator = '_') =>{
        return str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase()
    }
    // fromCamelCase('someDatabaseFieldName', ' ') -> 'some database field name'
    // fromCamelCase('someLabelThatNeedsToBeCamelized', '-') -> 'some-label-that-needs-to-be-camelized'
    // fromCamelCase('someJavascriptProperty', '_') -> 'some_javascript_property'
```
### 转换左右
```js
    const reverseString = str =>{
        return str.split('').reverse().join('')
    }
    // reverseString('foobar') -> 'raboof'
```
### 按照字母排序
```js
    const sortCharactersInString = str =>{
       return  str.split('').sort((a, b) => {
           return a.localeCompare(b)
       }).join('');
    }
    // sortCharactersInString('cabbage') -> 'aabbceg'
```
### 转为驼峰
使用replace（）去除下划线，连字符和空格，并将单词转换为camelcase。
```js
    const toCamelCase = str =>{
        return str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) =>{
           return p2 ? p2.toUpperCase() : p1.toLowerCase()
        })
    }
    // toCamelCase("some_database_field_name") -> 'someDatabaseFieldName'
    // toCamelCase("Some label that needs to be camelized") -> 'someLabelThatNeedsToBeCamelized'
    // toCamelCase("some-javascript-property") -> 'someJavascriptProperty'
    // toCamelCase("some-mixed_string with spaces_underscores-and-hyphens") -> 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
### 转为单词数组
使用String.split（）与提供的模式（默认为非alpha作为正则表达式）来转换为字符串数组。使用Array.filter（）删除任何空字符串。
```js
    const words = (str, pattrern = /[^a-zA-Z-]+/) =>{
        return str.split(pattrern).filter(Boolean)
    }
   
    // ["I", "love", "javaScript", ""]
    // words("I love javaScript!!") -> ["I", "love", "javaScript"]
    // ["python", "javaScript", "coffee"]
    // words("python, javaScript & coffee") -> ["python", "javaScript", "coffee"]
 ```
 ## Utility
 ### 扩展Hex(16进制颜色)
 将3位数的颜色代码扩展为6位数的颜色代码
 ```js
    const extendHex = shortHex => {
        return '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split('').map( s => s+s).join("")
    }
```
### 值的类型
```js
    const getType = v =>{
        v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase()
    }   
    // getType(new Set([1,2,3])) -> "set"
```
### 十六进制颜色转rgb
如果提供了alpha值，则将颜色代码转换为rgb（）或rgba（）字符串。 使用＆（和）运算符，按位右移运算符和掩码位将具有RGB值的十六进制颜色代码（带或不带前缀＃）转换为字符串。如果是3位数的颜色代码，则先转换为6位数字版本。如果一个alpha值和6位十六进制一起提供，则返回rgba（）字符串。
```js

    const hexToRGB = hex => {
      let alpha = false, h = hex.slice(hex.startsWith('#') ? 1 : 0);
      if (h.length === 3) h = [...h].map(x => x + x).join('');
      else if (h.length === 8) alpha = true;
      h = parseInt(h, 16);
      return 'rgb' + (alpha ? 'a' : '') + '('
        + (h >>> (alpha ? 24 : 16)) + ', '
        + ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) + ', '
        + ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0))
        + (alpha ? `, ${(h & 0x000000ff)}` : '') + ')';
    };

    // hexToRGB('#27ae60ff') -> 'rgba(39, 174, 96, 255)'
    // hexToRGB('27ae60') -> 'rgb(39, 174, 96)'
    // hexToRGB('#fff') -> 'rgb(255, 255, 255)'
```
 ### 随机十六进制颜色
 使用Math.random生成一个随机的24位（6x4bits）十六进制数字。使用位移，然后使用toString（16）将其转换为十六进制字符串。
 ```js
    
```
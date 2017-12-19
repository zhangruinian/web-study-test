> 30s之内可以理解的有用的js代码片段
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
### 深度扁平
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



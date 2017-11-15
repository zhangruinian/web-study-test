## 说明
当你写了很多函数的时候，如何组织这些函数，形成自己的一个工具函数库，可以借鉴underscore，学习函数库的封装,组织

## 自己实现

简单来做，可以吧函数挂载在window(global)对象的_属性上
```js
    ;(function() {
        var root = this
        var _ = {}
        root._ = _
        
        _.reverse = function(string) {
          return string.split("").reverse()
        }
    })()

```
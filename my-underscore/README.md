## 说明
当你写了很多函数的时候，如何组织这些函数，形成自己的一个工具函数库，可以借鉴underscore，学习函数库的封装,组织
> [参考学习地址](https://github.com/mqyqingfeng/Blog/issues/56)

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
## 兼容 window/worker/node/vm/小程序的root

```js
var root = (typeof self == 'object' && self.self == self && self) ||
           (typeof global == 'object' && global.global == global && global) ||
           this ||
           {};
```

## 函数对象
underscore支持函数式风格工具库,也支持类似面向对象的方式调用

既然以 _([1, 2, 3]) 的形式可以执行，就表明 _ 不是一个字面量对象，而是一个函数！

幸运的是，在 JavaScript 中，函数也是一种对象，我们完全可以将自定义的函数定义在 _ 函数上！

改进之后的写法可以是
```js
    var _ = function() {}
    
    root._ = _;
```

## 导出
也就是最后一步 root._ = _, 为了支持模块化,需要将_在合适的环境中作为模块导出,兼容nodejs模块的API

```js
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            // 两者保持统一  exports 是 module.exports 的一个引用，当你使用了 module.exports = function(){}，
            // 实际上覆盖了 module.exports，但是 exports 并未发生改变，为了避免后面再修改 exports 而导致不能正确输出
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
```
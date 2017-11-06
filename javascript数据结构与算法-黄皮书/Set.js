// 以下代码书写 类似 codeWars刷题模式
// 集合中的并集 交集 差集等方法可以自己选择性实现
function Set () {
    var items = {}
    this.has = function (value) {
        // return value in items
        // 更好的实现方式
        return items.hasOwnProperty(value)
    }
    this.add = function (value) {
        if (!this.has(value)) {
            items[value] = value
            return true
        }
        return false
    }
    this.remove = function (value) {
        if (this.has(value)) {
            delete items[value]
            return true
        }
        return false
    }
    this.clear = function () {
        items = {}
    }
    this.size = function () {
        // es5 ie9以上
        // return Object.keys(items).length
        // 兼容所有的方法
        var count = 0
        for (var prop in items) {
            if (items.hasOwnProperty(prop))
                ++count
                // count += 1
        }
        return count
    }
    this.values = function () {
        // return Object.keys(items)
        // 兼容写法
        var keys = []
        for(var key in items){
            keys.push(key)
        }
        return keys
    }
    this.print = function () {
        console.log(items)
    }
}

var set = new Set()

set.add(1)
set.add(2)
console.log(set)
set.print()
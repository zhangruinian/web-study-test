function Stack () {
    var items = []
    this.push = function (item) {
        // 是否返回由自己而定
        return items.push(item)
    }

    // 从栈顶删除
    this.pop = function () {
        return items.pop()
    }

    // 返回栈顶元素
    this.peek = function () {
        return items[items.length - 1]
    }

    this.isEmpty = function () {
        return items.length = 0
    }

    this.size = function () {
        return items.size()
    }

    // 清空所有元素
    this.clear = function () {
        // items.length = 0  
        items = []
    }

    this.print = function () {
        console.log(items.toString())
    }
}

var stack = new Stack()

console.log(stack.push(5))
console.log(stack.push(6))
console.log(stack.peek())
stack.print()

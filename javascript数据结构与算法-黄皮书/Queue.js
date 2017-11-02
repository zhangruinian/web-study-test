function Queue () {
    var items = []
    // 无论栈还是队列都是push添加 进完之后出的顺序不一样
    this.enqueue = function (item) {
        return items.push(item)
    }

    this.dequeue = function (item) {
        return items.shift(item)
    }

    this.front = function () {
        return items[0]
    }

    this.isEmpty = function(){
        return items.length == 0
    }

    this.size = function () {
        return items.length
    }
    
    this.print = function () {
        console.log(items.toString())
    }
}

var queue = new Queue()

console.log(queue.isEmpty())

queue.enqueue(2)
queue.enqueue(3)
queue.print()

function HashTable () {
    var table = []
    // 私有方法,散列函数
    var loseloseHashCode = function (key) {
        var hash = 0
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        // 任意数做除法以得到比较小的数
        return hash % 37
    }
    // 更好的散列函数
    /*var djb2HashCode = function (key) {
        var hash = 5381
        for (var i = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i)
        }
        // 另一个随机质数/比散列表大小要大即可
        return hash % 1013
    }*/
    this.put = function (key, value) {
        var position = loseloseHashCode(key)
        console.log(position + '-' + key)
        table[position] = value
    }
    this.get = function (key) {
        return table[loseloseHashCode(key)]
    }
    this.remove = function (key) {
        // 不是删除, 否则会改变位置
        table[loseloseHashCode(key)] = undefined
    }
}

var hash = new HashTable()
hash.put('Gandalf', 'gandalf@email.com')
hash.put('John', 'johnsnow@email.com')
hash.put('John', 'johnsnow@email.com111')
hash.put('Tyrion', 'tyrion@email.com')
console.log(hash.get('Gandalf'))
// 此时的散列函数很容易发生冲突  解决冲突的方法有 分离链接,线性探查等等

;(function() {
    var root = this
    var _ = {}
    root._ = _
    _.reverse = function(string) {
        return string.split("").reverse().join("")
    }
})()

console.log(_.reverse('hello'))
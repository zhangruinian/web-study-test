;(function() {
    var root = this
    var _ = {}
    root._ = _
    _.reverse = function(string) {
        return string.split("").reverse().join("")
    }
})()
console.log(_.reverse('hello'))

var $= function() {};
$.value = 1;
$.log = function() { return this.value + 1 };
console.log($.value); // 1
console.log($.log()); // 2
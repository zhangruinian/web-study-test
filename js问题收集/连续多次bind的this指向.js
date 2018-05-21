// 面试时有被问,多次被bind a  b c 想一下如果是第三方库会怎么样

var bar = function () {

    console.log(this.x)
    console.log(this)

}

var foo = {

    x: 3

}

var sed = {

    x: 4

}

var func = bar.bind(foo).bind(sed)

func() //? 3


var fiv = {

    x: 5

}

var func = bar.bind(foo).bind(sed).bind(fiv)

func() //? 3 此时this 时候foo:{x:3}

// 在Javascript中，多次 bind() 是无效的。
// 更深层次的原因， bind() 的实现，相当于使用函数在内部包了一个 call / apply ，
// 第二次 bind() 相当于再包住第一次 bind() ,故第二次以后的 bind 是无法生效的。

// 下面示例一样
var a = function () {
    console.log("a")
    if (this) {
        this()
    }
}

var b = function () {
    console.log("b")
}

var c = function () {
    console.log("c")
}

var d = a.bind(b)
var e = d.bind(c)
d()
e()
// a b a b
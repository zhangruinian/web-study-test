let getSingle = function (fn) {
    let result
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}

// 使用示例

var createLoginLayer = function () {
    var div = document.createElement('div')
    div.innerHTML = '我是登录浮窗'
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
}
var createSingleLoginLayer = getSingle(createLoginLayer)
document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createSingleLoginLayer()
    loginLayer.style.display = 'block'
}
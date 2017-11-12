// 时间版运动

/**
 *
 * @param {Object} obj 元素对象
 * @param {Object} json 多个属性
 * @param {Object} time 变化时间
 * @param {Object} prop 运动函数
 * @param {Object} callback 回调函数
 */
//时间版本
(function (win) {
    function move(obj, json, time, prop, callback) {
        //一般定时器结束后最好清除
        clearInterval(obj.timer)
        var curr = {}
        var end = {}
        //通过for in 在上车前把所有东西装到包里
        for (var attr in json) {
            if (attr == "opacity") {//opacity特殊东西特殊对待
                curr[attr] = getStyle(obj, attr) * 100//化为整数好计算 以便兼容ie
            } else {
                // 去掉px 变为数字
                curr[attr] = parseInt(getStyle(obj, attr)) || 0
            }
            end[attr] = parseInt(json[attr])
        }
        
        var startTime = +new Date()//开始时间T0
        //开始变换了
        obj.timer = setInterval(function () {
            var nowTime = +new Date()
            //当前时间t 是不断变换的随着运动时间的变换
            var t = nowTime - startTime
            var d = time
           
            if (t >= d) {
                t = d
                clearInterval(obj.timer)
                callback && callback.call(obj)
            }
            for (var attr in json) {
                var b = curr[attr]
                var c = end[attr] - b
                var value = Tween[prop](t, b, c, d)

                if (attr == "opacity") {
                    console.log(value)
                    obj.style[attr] = value / 100
                    obj.style.filter = "alpha(opacity=" + value + ")"
                } else {
                    // console.log(value)
                    obj.style[attr] = value + "px"
                }
            }
        }, 1000/60)
        // 运动的过程中t是在过程中不断变换的,可变的 起始是0 中间1/2
        /*t b c d
        t current time   :nowTime-startTime 当前时间
        b begining value  :curr(attr) 初始值(不可变)
        c change in value :变化量end-curr 变化值
        d duration       :持续时间 time
        return 目标点
        */
        var Tween = {
            linear: function (t, b, c, d) {  //匀速
                return c * t / d + b   //  t/d = prop;
            },
            easeIn: function (t, b, c, d) {  //加速曲线
                return c * (t /= d) * t + b
            },
            easeOut: function (t, b, c, d) {  //减速曲线
                return -c * (t /= d) * (t - 2) + b
            },
            easeBoth: function (t, b, c, d) {  //加速减速曲线
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b
            },
            easeInStrong: function (t, b, c, d) {  //加加速曲线
                return c * (t /= d) * t * t * t + b
            },
            easeOutStrong: function (t, b, c, d) {  //减减速曲线
                return -c * ((t = t / d - 1) * t * t * t - 1) + b
            },
            easeBothStrong: function (t, b, c, d) {  //加加速减减速曲线
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b
            },
            elasticIn: function (t, b, c, d, a, p) {  //正弦衰减曲线（弹动渐入）
                if (t === 0) {
                    return b
                }
                if ((t /= d) == 1) {
                    return b + c
                }
                if (!p) {
                    p = d * 0.3
                }
                if (!a || a < Math.abs(c)) {
                    a = c
                    var s = p / 4
                } else {
                    var s = p / (2 * Math.PI) * Math.asin(c / a)
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
            },
            elasticOut: function (t, b, c, d, a, p) {    //正弦增强曲线（弹动渐出）
                if (t === 0) {
                    return b
                }
                if ((t /= d) == 1) {
                    return b + c
                }
                if (!p) {
                    p = d * 0.3
                }
                if (!a || a < Math.abs(c)) {
                    a = c
                    var s = p / 4
                } else {
                    var s = p / (2 * Math.PI) * Math.asin(c / a)
                }
                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b
            },
            elasticBoth: function (t, b, c, d, a, p) {
                if (t === 0) {
                    return b
                }
                if ((t /= d / 2) == 2) {
                    return b + c
                }
                if (!p) {
                    p = d * (0.3 * 1.5)
                }
                if (!a || a < Math.abs(c)) {
                    a = c
                    var s = p / 4
                }
                else {
                    var s = p / (2 * Math.PI) * Math.asin(c / a)
                }
                if (t < 1) {
                    return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                        Math.sin((t * d - s) * (2 * Math.PI) / p)) + b
                }
                return a * Math.pow(2, -10 * (t -= 1)) *
                    Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b
            },
            backIn: function (t, b, c, d, s) {     //回退加速（回退渐入）
                if (typeof s == 'undefined') {
                    s = 1.70158
                }
                return c * (t /= d) * t * ((s + 1) * t - s) + b
            },
            backOut: function (t, b, c, d, s) {
                if (typeof s == 'undefined') {
                    s = 3.70158  //回缩的距离
                }
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
            },
            backBoth: function (t, b, c, d, s) {
                if (typeof s == 'undefined') {
                    s = 1.70158
                }
                if ((t /= d / 2 ) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
            },
            bounceIn: function (t, b, c, d) {    //弹球减振（弹球渐出）
                return c - Tween['bounceOut'](d - t, 0, c, d) + b
            },
            bounceOut: function (t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b
                }
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b
            },
            bounceBoth: function (t, b, c, d) {
                if (t < d / 2) {
                    return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b
                }
                return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
            }
        }
    }

    win.animateTime = move
})(window)

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]
    } else {
        return getComputedStyle(obj, false)[attr]
    }
}
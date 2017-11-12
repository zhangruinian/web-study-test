/**
 *
 * @param obj
 * @param {Object} json
 * @param {Number} speed
 * @param callback
 */
function speedMove(obj, json, speed, callback) {
    clearInterval(obj.timer)
    var current = 0

    obj.timer = setInterval(function () {

        var mark = true

        for (var attr in json) {

            var target = json[attr]

            if (attr == 'opacity') {
                current = Math.round(getStyle(obj, 'opacity') * 100)
            } else {
                current = parseInt(getStyle(obj, attr))
            }

            if (current != target) {
                mark = false
                if (attr == 'opacity') {
                    obj.style.opacity = (current + speed) / 100
                    obj.style.filter = 'alpha(opacity=' + (current + speed) + ')'
                } else {
                    obj.style[attr] = current + speed + 'px'
                }
            }

        }
        if (mark) {
            clearInterval(obj.timer)
            callback && callback()
        }

    }, 1000/60) // 刷新频率,用了requestAnimationFrame就不需要考虑了
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr]
    } else {
        return getComputedStyle(obj, false)[attr]
    }
}

export default speedMove
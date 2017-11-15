// 面向对象编程---原型来实现类, 确切说是组合使用构造函数模式和原型模式
// 优点: 共享实例方法,节省内存,每个示例自己单独属性,还可以传参数

function EventTarget(){
    // 存储事件处理程序
    this.handlers = {}
}

EventTarget.prototype = {
    constructor: EventTarget,
    /**
     * 添加自定义事件名称和处理程序
     * @param {string}type
     * @param {function}handler
     */
    addHandler: function (type, handler) {
        if(typeof this.handlers[type] === 'undefined'){
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    },
    /**
     * 触发自定义事件,并传递自定义事件信息event的各种属性
     * @param {object}event
     */
    fire: function (event) {
        if(!event.target){
            event.target = this
        }
        if(this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type]
            handlers.forEach((handler) =>{
                handler(event)
            })
        }
    },
    /**
     *移除自定义事件
     * @param {string}type
     * @param {function}handler
     */
    removeHandler: function (type, handler) {
        if(this.handlers[type] instanceof Array){
            var handlerLists = this.handlers[type]
            handlerLists.forEach((list, index) =>{
                list === handler && handlerLists.splice(index,1)
            })
        }
    }
}

function handleMessage(event){
    console.log("Message received: " + event.message);
    console.log(event)
}

var target = new EventTarget()

target.addHandler('message', handleMessage)

target.fire({type: "message", message: 'hello 自定义messafe', other: '我是其他event属性'})

target.removeHandler("message", handleMessage)

// 再次触发只会undefined 什么都不会执行
target.fire({type: "message", message: 'hello 自定义messafe', other: '我是其他event属性'})
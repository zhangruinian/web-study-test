// 使用ES6来组织和编写代码

class EventTarget{
    constructor (){
        this.handlers = {}
    }
    addHandler(type, handler) {
        if(typeof this.handlers[type] === 'undefined'){
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    }
    fire(event) {
        if(!event.target){
            event.target = this
        }
        if(this.handlers[event.type] instanceof Array){
            var handlerLists = this.handlers[event.type]
            handlerLists.forEach((handler) =>{
                handler(event)
            })
        }
    }
    removeHandler (type, handler) {
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
    console.log(event.type, event.other)
}

var target = new EventTarget()

target.addHandler('message', handleMessage)

target.fire({type: "message", message: 'hello 自定义messafe', other: '我是其他event属性'})

target.removeHandler("message", handleMessage)

// 再次触发只会undefined 什么都不会执行
target.fire({type: "message", message: 'hello 自定义messafe', other: '我是其他event属性'})

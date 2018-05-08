// 观察者模式 核心点就是用一个全局对象来存放所有的事件
let observal = {
    eventObj: {},
    on(eventName, cb){
        this.eventObj[eventName] = this.eventObj[eventName] || []
        this.eventObj[eventName].push(cb)
    },
    // 传对象的形式 也可以改为函数参数 下面用cb.apply(this, arguments)
    emit(eventName, options){
        let eventList = this.eventObj[eventName] || []
        eventList.forEach((cb) => {
            cb(options)
        })
    },

    off(eventName){
        this.eventObj[eventName] = null
    }
}

observal.on('test', ({data}) =>{
    console.log('收到数据了:', data)
})

observal.emit('test', {data:"我是测试数据"} )
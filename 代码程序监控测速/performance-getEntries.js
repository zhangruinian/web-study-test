// ajax调用成功之后 ,或者某个回调中执行
var obj = {
    apiSpeeds: [],
    cdnSpeeds: []
}

window.performance.getEntries().forEach(function (perf) {
    if(/(api\.geetest)/.test(perf.name)){
        obj.apiSpeeds.push({
            name: perf.name.split('?')[0],
            type: perf.initiatorType,
            duration: parseInt(perf.duration)
        });
        vm.passTime += perf.duration
    }
    if(/(static\.geetest)/.test(perf.name)){
        obj.cdnSpeeds.push({
            name: perf.name.split('?')[0],
            type: perf.initiatorType,
            duration: parseInt(perf.duration)
        });
        vm.passTime += perf.duration
    }
});
// 然后可以利用vue模板渲染,或者jquery等渲染出来

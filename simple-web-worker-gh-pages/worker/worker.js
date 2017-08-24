onmessage = function(e) {
    console.log('Message received from main script');
    var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    console.log('Posting message back to main script');
    postMessage(workerResult);
}

var page = require('webpage').create();
page.open('http://baidu.com', function () {
    page.render('baidu.png');
    phantom.exit();
});
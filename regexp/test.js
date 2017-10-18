var str = '<script charset="UTF-8" src="http://static.geetest.com/dist/js/geeguard.1.2.0.js"></script> 222<script async="" charset="UTF-8" src="http://static.meiqia.com/dist/meiqia.js"></script>'
console.log(str.replace( /<script.*?geeguard.*<\/script>/g, ''))
console.log(str)
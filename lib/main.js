
var http = require('http'),
    fs = require('fs'),
    url = require("url"),
    pooling = require('./app-pooling');

function main(argv){
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
	port = config.port || 80
    dbpool = config.pool;

    http.createServer(function (request, response) {
	var params = url.parse(request.url, true).query;
	var dates = params.dates;
	pooling(dbpool, dates, function(result){
	   for(var i in result){
            console.log(result[i]);
        }
	});
    }).listen(port);
}

main(process.argv.slice(2));

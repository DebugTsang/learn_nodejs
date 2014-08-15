var http = require('http');
var fs = require('fs');
var path = require('path');//helps with file paths
var gm = require('gm'); //Graphics Magick
var fileName;

var hostIP = *** HOST IP ADDRESS ***;
var port = *** HOST PORT ***;

/* SET folder ./img/ as Your image repository */
http.createServer(function (req, res) {

	console.log("remote:"+req.connection.remoteAddress);
	
	fs.readdir('./img/', function(err, files){
    
    var fileIndex = randomIntInc(0, files.length-1);
    
    fileName = files[fileIndex];
    
	fs.readFile('./img/'+fileName, function(err, data) {
		
		if (err) throw err; // Fail if the file can't be read.
		
		res.writeHead(200, {'Content-Type': 'text/html'});
			
		res.write('<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>');
		
		res.write('<body><img src="data:image/jpeg;base64,');
		
		res.write(new Buffer(data).toString('base64'));

		res.write('" alt="Cuisine"  style="max-width:320px; height:240px; transform-origin:left top;" />');
		
		res.end('</body></html>');

	});
	
	});	

}).listen(port, hostIP);

console.log('NodeJS Server running at http://'+hostIP+':'+port);	

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}


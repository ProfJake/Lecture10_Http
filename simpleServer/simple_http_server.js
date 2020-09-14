var fs = require('fs');
var http = require('http');
var url = require('url');

var ROOT = "./html/";
let server = http.createServer(function (req, res) {
    var urlOBJ = url.parse(req.url, true, false);

    fs.readFile(ROOT + urlOBJ.pathname, function(err, data){

	if (err){
	    res.writeHead(404);
	    res.end(JSON.stringify(err));
	}
	res.writeHead(200);
	res.end(data);
    });
}).listen(3000, ()=>{
    console.log("Server is running");
});

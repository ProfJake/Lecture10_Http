var fs = require('fs');
var http = require('http');
//var url = require('url');
var wg = require('whatwg-url');

//This is the path where the our html resources are stored, relative to this
//file
var filePath = "./html/";
let server = http.createServer(function (req, res) {
    
    var urlOBJ = new URL(req.url, "http://localhost:3000");// url.parse(req.url, true, false);
//    console.log(req);
    console.log(urlOBJ);
    fs.readFile(filePath + urlOBJ.pathname, function(err, data){

	if (err){
	    res.writeHead(404);
	    res.write("<h1> ERROR 404. PAGE NOT FOUND</h1><br><br>");
	    res.end(JSON.stringify(err));
	}
	res.writeHead(200);
	res.end(data);
    });
}).listen(3000, ()=>{
    console.log("Server is running");
});

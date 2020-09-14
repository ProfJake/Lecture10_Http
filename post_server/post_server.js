var http = require('http');
var url = require('url');

http.createServer(function (req, res) {

    var urlOBJ = url.parse(req.url, true, false);
    var POSTDATA = '';
    req.on('data', function (chunk) {
	POSTDATA += chunk;
    });
    var resOBJ;
    req.on('end', function (){
	
	console.log(POSTDATA);
	var reqOBJ = JSON.parse(POSTDATA);
	var greeting = `Hello ${reqOBJ.name}`;
	var quest = `Are you a good ${reqOBJ.occupation}?`;

	resOBJ = { message: greeting, question: quest};
	res.writeHead(200);
	res.end(JSON.stringify(resOBJ));
    });

    
}).listen(3000, ()=>{
    console.log("Server is Running")
});

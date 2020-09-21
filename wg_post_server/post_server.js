var http = require('http');
var url = require('url');
var wg = require('whatwg-url');


http.createServer(function (req, res) {
    // by default the req url is / or the root of the server
  //  var urlOBJ = new URL(req.url, 'localhost:3000');
    //    console.log(urlOBJ.toString());
    console.log(req.url);
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

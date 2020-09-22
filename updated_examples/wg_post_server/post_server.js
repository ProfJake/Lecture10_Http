/*
post_server.js
Jake Levy
Sept 2020


This is a simple server for handling post requests. A server will read data off
of POST requests, then return a response. This is opposed to GET requests which
just "ask" for a page rather than submitting data to be processed.
*/
var http = require('http');
var wg = require('whatwg-url');


http.createServer(function (req, res) {
    // by default the req url is / or the root of the server
    //   console.log(req.url);

    //We can check what kind of request is coming in
    if (req.method != "POST"){
	res.writeHead(404);//sets the response Status Code
	res.end("ERROR This is a POST server")
    }else{
 
	var POSTDATA = '';

	//when the request has data to send us, add it to the postdata
    req.on('data', function (chunk) {
	POSTDATA += chunk;
    });
	
	var resOBJ;
	//when the request is finished
    req.on('end', function (){
	
	//	console.log(POSTDATA);
	//We know we are getting stringified JSON data so we can just parse it
	var reqOBJ = JSON.parse(POSTDATA);

	//now we can work with the received data
	var greeting = `Hello ${reqOBJ.name}`;
	var quest = `Are you a good ${reqOBJ.occupation}?`;

	//create a new object to send back
	resOBJ = { message: greeting, question: quest};

	//set the status code of response
	res.writeHead(200);

	//write the data to the resonse object to be sent off
	res.end(JSON.stringify(resOBJ));
    });
    }

}).listen(3000, ()=>{
    console.log("Server is Running")
});

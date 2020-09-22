/*
*  post_client.js
*  Jake Levy
*  Sept 2020
*  
*  A simple client that generates a post request and submits data to the server
* Later when we make activity_server, we will see how form data works with 
* POST methods  
*/
var http = require('http');


var options = {
    host: '127.0.0.1',//this is the IP address that means "localhost"
    path: '/',   
    port: '3000',
    method: 'POST'
};

//a function to read the server response
function readJSONresp(response){
    var responseData = '';
    response.on('data', function (chunk) {
	responseData+=chunk;
    });

    response.on('end', function() {
	var dataOBJ = JSON.parse(responseData);
	console.log("Raw Response: " + responseData);
	console.log("Message: " + dataOBJ.message);
	console.log("Question: " + dataOBJ.question);
    });
}
//generate the request
var req = http.request(options, readJSONresp);
//write data directly to the request as a "stringified" object
req.write('{"name":"Bilbo", "occupation":"Burglar"}');
req.end();

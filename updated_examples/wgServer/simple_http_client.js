/*simple_http_client.js
Jake Levy
Sept 2020

A simple client program that can make a GET request.  But this is boring. 
Start up the server and then look at in your preferred browser.
*/
var http = require('http');

var options = {
    hostname: 'localhost',
    port: '3000',
    path: '/hello.html',
    auth: 'jake:badPassword'

};

function handleResponse(response) {
    var serverData = '';

    response.on('data', function (chunk) {
	serverData+=chunk;
    });

    response.on('end', function(){
	console.log(serverData);
    });
}

http.request(options, function(response){
    handleResponse(response);
}).end();

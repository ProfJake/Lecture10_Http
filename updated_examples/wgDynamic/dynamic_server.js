/*dynamic_server.js
*Jake Levy
*Sept 2020
*This is an example of a simple dynamic GET server (a simple website)
*Just info/presentations to the user
*
*/
var http = require('http');
const { createReadStream }  = require('fs');
var  path =  require('path');


//create the server
http.createServer(function(req, res){
  //grab the time
    let currentTime = new Date();
    //__dirname always refers to the current directory name
    var dir = path.join(__dirname, 'public');

    //console.log(dir);  //look at it if you want to


    //assemble the url object
    let urlObj = new URL(req.url,"http://localhost");
//    console.log(urlObj); //uncomment if you want to look at it

    //if a user tries to request anything other than the root diectory
    if (urlObj.pathname != "/"){
	//we will show them a gif (for now)
	//the process of serving up other images is the same.
	//just google the correcthtml  Content-Type header for the file 
	let file = path.join(dir, "noBS.gif");
	//create readStream
	let inStr = createReadStream(file);

	//when it's open
	inStr.on('open', function(){
	   //set the response Header
	    res.setHeader('Content-Type', 'image/gif');

	    //pipe the readable stream directly into the writable stream
	    inStr.pipe(res);
	});

	//error handling
	inStr.on('error', ()=>{
	    res.setHeader('Content-Type', 'text/html');
	    res.statusCode = 404;
	    res.end('<html><head><title>File Not Found</title></head> '+
		    '<h1>File Not Found</h1></html>');
	});
	//if they request the root	 
    }else{

	//respond with a dynamiclly generated page
	res.setHeader("Content-Type", "text/html");
	res.writeHead(200);
	res.write("<html><head><title> Dynamic Page testing</title></head>");
	res.write("<body><br><br> ");
	res.write("<h1>Your first Dynamic Page</h1>");
	res.write("This page was generated at " + currentTime.toTimeString() +
		  "</body>");
	res.end("</html>");//end works like write but closes the write stream
    }
}).listen(3000, () =>{
    console.log("Server is running")
});

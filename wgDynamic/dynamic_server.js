var http = require('http');


http.createServer(function(req, res){
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    let currentTime = new Date();
    res.write("<html><head><title> Dynamic Page testing</title></head>");
    res.write("<body><br><br> ");
    res.write("<h1>Your first Dynamic Page</h1>");
    res.write("This page was generated at " + currentTime.toTimeString() + "</body>");
    res.end("</html>");
}).listen(3000, () =>{
    console.log("Server is running")
});

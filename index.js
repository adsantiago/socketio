// Import http module
const http = require('http');

// umport fs module
/* 
 * umport path module 
 * umport path module  this module allows to read files from the local system
 */
const fs = require('fs');
// umport path module 
const path = require('path');

// Set host name and port
const hostname = 'localhost';
const port = 3000;

/* 
 * Create arrow function with module http for creating http server
 * and send a HTTP response req = request and res = response
 * The response status is set to 200 and the headers are set with setHeader
 * and the body response is set with end
 * if the page does not exist it set status code to 400
 * if it exists set status 200
 * if the file does not have html extension show 404 status code
 */
const server = http.createServer((req, res) => {
    /*
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello, World!</h1></body></html>');
    */

    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
      var fileUrl;
      if (req.url == '/') fileUrl = '/index.html';
      else fileUrl = req.url;
      
      //Get file path
      var filePath = path.resolve('./public'+fileUrl);
      // Get file extension
      const fileExt = path.extname(filePath);
      if (fileExt == '.html') {
        fs.exists(filePath, (exists) => {
          if (!exists) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
                        ' not found</h1></body></html>');
            return;
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          // Read file and pass it to stream bytes to pipe it
          fs.createReadStream(filePath).pipe(res);
        });
      }
      else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + fileUrl + 
                ' not a HTML file</h1></body></html>');
      }
    }
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + 
                ' not supported</h1></body></html>');
    }    
})

/* 
 * Start server with port and hostname set above 
 * and access to the server in the browser with:
 * http://localhost:3000/`
 */
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const fs = require('fs');

const requestHandler = (req, res) => {

  const url = req.url;
  const method = req.method;

  if( url === '/' ){

    res.write('<html>');
    res.write('<head> <title> Enter Data </title> </head>');
    res.write('<body> <form action="/message" method="POST"> <input type="text" name="message"> <button type="submit"> Send </button> </form> </body>');
    res.write('</html>');
    return res.end();   
  
   }
  
   if( url === '/message' && method === 'POST' ){
     const body = [];
     
     // createServer implicitly creates a listener for us but now we do it on our OWN 
     // The .on() allows us to listen to certain events
     // The 'data' event will be fire whenever a new chunck of data is ready to be READ
     // The 'data' event will trigger an annonymous function for every incoming DATA 
     req.on('data', (chunk) => {
       // DATA in this part cannot be worked with 
       console.log(chunk);
       body.push(chunk);
     } );
     
     // Registering another EVENT LISTENER
     // Then 'end' LISTENER will fire once its DONE parsing the INCOMING REQUEST DATA
     return req.on('end', () => {
       // To work with all those chunks of DATA we must BUFFER them
       // The BUFFER OBJECT is available GLOBALLY thanks to NODE.js
       // This will create a NEW BUFFER and will add all the CHUNKS of DATA from the BODY
       // .toString() is a UTILITY METHOD provided by NODE.js
       const parsedBody = Buffer.concat(body).toString();
  
       // DATA here is pushed out as key and keyValue. Separated by = 
       // This allows us to use it an store the DATA
       console.log(parsedBody);   
       const message = parsedBody.split('=')[1];
       // With the following line of code We BLOCK execution of the next lines of code until this file is DONE
       // This is not good because the file could be bigger and take longer to complete. 
       fs.writeFile('message.txt', message, err => {
         res.writeHead( 302, {Location: '/'} );
         return res.end(); 
       });
  
     });
  
   }
  
   res.setHeader('Content-Type', 'text/html');
   res.write('<html>');
   res.write('<head> <title> Node.JS App v1 </title> </head>');
   res.write('<body> <h1> Hello World! </h1> </body>');
   res.write('</html>');
   res.end();

};

module.exports = requestHandler;

// OTHER WAYS TO EXPORT FUNCTIONS

// module.exports = {
//   handler: requestHandler,
//   someText: 'Some hard-coded text.'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard-coded text.';

// exports.handler = requestHandler;
// exports.someText = 'Some hard-coded text.'
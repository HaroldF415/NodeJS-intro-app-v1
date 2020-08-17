// USING CORE MODULES

// We will use it but never overide
const http = require('http');

// This is not required when creating a server. It can be also be passed in as an annonymous function
// reqListener = (req, res) => {
// };

// We will start using functionalities from that core module - http is an OBJECT
// Using next-gen JS syntax [ arrow function ]
// The createServer method returns a server. We MUST store it in CONST
// console.log will return data after we use the browser and go to localhost:3000 and it will keep running until you close it ctrl + c
const server = http.createServer( (req, res) => {

  // Load a page where the user can ENTER some DATA which then we STORE in a file on the SERVER once it is SENT
  // PARSE the URL
  const url = req.url;

  if( url === '/' ){

   res.write('<html>');
   res.write('<head> <title> Enter Data </title> </head>');
   res.write('<body> <form action="/message" method="POST"> <input type="text" name="message"> <button type="submit"> Send </button> </form> </body>');
   res.write('</html>');
   return res.end();   

  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head> <title> Node.JS App v1 </title> </head>');
  res.write('<body> <h1> Hello World! </h1> </body>');
  res.write('</html>');
  res.end();

} );

server.listen( 3000 );
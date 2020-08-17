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

  // req is an OBJECT
  // It contains headers - META DATA/ INFO
  console.log(req.url, req.method, req.headers);
  
  // This will attach a HEADER to the response where we will pass META INFO that the TYPE of the CONTENT that will ALSO be part of the RESPONSE is HTML
  res.setHeader('Content-Type', 'text/html');

  // Writes DATA to the RESPONSE
  res.write('<html>');
  res.write('<head> <title> Node.JS App v1 </title> </head>');
  res.write('<body> <h1> Hello World! </h1> </body>');
  res.write('</html>');
  // We MUST tell NODE when we are done with the RESPONSE
  // We CANNOT keep writing to the RESPONSE after the following line of code.
  res.end();

  // Program will continue to run because of the EVENT LOOP but this next line of code will EXIT the program when it's done.
  // Typically we don't want to do this because it also EXITS / QUITS your server.
  // process.exit();

} );

server.listen( 3000 );
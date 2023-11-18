/***
 * Title: Uptime Monitoring Application
 * Description: A RESTFUL API to monitor up or down time of user defined links
 * Author: Robiul Hossain (with LWS)
 * Date: 14/11/2023
 */
// dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('node:string_decoder');
// app object - module scaffolding
const app = {};

// configuration
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port, () => {
    console.log(`Listening to port ${app.config.port}`);
  })
}

// handle request and response
app.handleReqRes = (req, res) => {
  // request handling 
  // get the url and parse it 
  const parsedUrl = url.parse(req.url, true); // true gives full pathname with queries
  // console.log(parsedUrl);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/gm, "");
  const queryObj = parsedUrl.query;
  // console.log(trimmedPath);

  // find http method
  const method = req.method.toLowerCase();
  // console.log(method);
  const headerObj = req.headers;
  // console.log(headerObj);
  // console.log(queryObj);

  // post method + sent data streaming + how to decode buffer
  const decoder = new StringDecoder("utf-8");
  let realData = "";
  // data streaming
  req.on('data', (buffer) => {
    realData += decoder.write(buffer);
  })
  // stream end
  req.on('end', () => {
    realData += decoder.end();

    console.log(realData);

    // response handling 
    res.end("Uptime Monitoring server is running");
  })

}

// start the server
app.createServer();
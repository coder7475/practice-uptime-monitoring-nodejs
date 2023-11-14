/***
 * Title: Uptime Monitoring Application
 * Description: A RESTFUL API to monitor up or down time of user defined links
 * Author: Robiul Hossain (with LWS)
 * Date: 14/11/2023
 */
// dependencies
const http = require('http');
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
  res.end("Uptime Monitoring server is running");
}

// start the server
app.createServer();
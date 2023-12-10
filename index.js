/***
 * Title: Uptime Monitoring Application
 * Description: A RESTFUL API to monitor up or down time of user defined links
 * Author: Robiul Hossain (with LWS)
 * Date: 14/11/2023
 */
// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// testing file system
data.create('test', 'newFile', { 'name': "testData"}, (err) => {
  console.log(`error was`, err);
})

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`Listening to port ${environment.port} on ${environment.envName}`);
  })
}

// handle request and response
app.handleReqRes = handleReqRes;
// start the server
app.createServer();
// console.log(app);
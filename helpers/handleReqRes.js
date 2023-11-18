// dependencies
const url = require('url');
const { StringDecoder } = require('node:string_decoder');

// object scafolding
const handler = {};

handler.handleReqRes = (req, res) => {
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

  // ceate request object
  const reqObj = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryObj,
    headerObj
  }

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


module.exports = handler;
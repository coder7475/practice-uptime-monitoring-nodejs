// dependencies
const url = require("url");
const { StringDecoder } = require("node:string_decoder");
const routes = require("./../routes");
const {
  notFoundHandler,
} = require("./../handlers/routeHandler/notFoundHandler");

// object scafolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // request handling
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true); // true gives full pathname with queries
  // console.log(parsedUrl);
  const path = parsedUrl.pathname;
  // console.log(path);
  const trimmedPath = path.replace(/^\/+|\/+$/gm, "");
  // console.log(trimmedPath);

  const queryObj = parsedUrl.query;
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
    headerObj,
  };

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  // post method + sent data streaming + how to decode buffer
  const decoder = new StringDecoder("utf-8");
  let realData = "";
  // data streaming
  req.on("data", (buffer) => {
    
    realData += decoder.write(buffer);
  });
  // stream end
  req.on("end", () => {
    realData += decoder.end();
    
    chosenHandler(reqObj, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 404;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.writeHead(statusCode);
      res.end(payloadString);
    });
    // console.log(realData);

    // response handling
    res.end("Uptime Monitoring server is running");
  });
};

module.exports = handler;

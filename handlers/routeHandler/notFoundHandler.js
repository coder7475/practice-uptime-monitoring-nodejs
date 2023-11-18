const handler = {};

handler.notFoundHandler = (reqObj, callback) => {
  callback(200, {
    message: "Not Found"
  })
  // console.log("Not Found");
}

module.exports = handler;
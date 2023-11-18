const handler = {};

handler.testHandler = (reqObj, callback) => {
  console.log(reqObj);

  callback(200, {
    message: "This is a test url"
  })
  // console.log("test handler");
  
}

module.exports = handler;
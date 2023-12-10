// dependensice
const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, './../.data/');

lib.create = (dir, fileName, data, callback) => {
  // open takes file path + modifier + error backed call back
  const filePath = `${lib.basedir + dir}/${fileName}.json`;
  
  // open the file
  fs.open(filePath, 'wx', (err, fileDescriptor) => {
    
    if (!err && fileDescriptor) {
      // convert data to string
      const stringData = JSON.stringify(data);

      // write the data to the file and then close it 
      fs.writeFile(fileDescriptor, stringData, (err2) => {
        
        if (!err2) {
          // close the file
          fs.close(fileDescriptor, (err3) => {
            // successfully close the file
            if (!err3) {
              callback(false);
            } else {
              callback("Error closing the file")
            }

          })

        } 
        else {
          callback("Error writing to new field")
        }
      
      })



    } else {
      callback("File already exits.")
    }

  })

}


lib.read = (dir, fileName, callback) => {
  const filePath = `${lib.basedir + dir}/${fileName}.json`;

  fs.readFile(filePath, 'utf8', (err, data) => {
    callback(err, data);
  })
}

module.exports = lib;
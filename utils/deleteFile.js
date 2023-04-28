const fs = require('fs');

const  deleteFile = (filePath)=> {
  console.log(filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${filePath} has been deleted.`);
  });
}

module.exports = { deleteFile };
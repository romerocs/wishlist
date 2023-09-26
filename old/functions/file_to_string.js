const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const fileContents = fs.readFileSync(path.resolve(__dirname, './testing.js')).toString();

  return {
    statusCode: 200,
    body: JSON.stringify(fileContents)
  };
};
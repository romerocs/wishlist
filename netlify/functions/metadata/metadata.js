const { gotScraping } = require('got-scraping');

exports.handler = async function (event, context) {

  const { body } = await gotScraping({ url: 'https://www.example.com' });
  console.log(body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      body: body
    })
  }

};
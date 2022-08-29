const playwright = require('playwright-aws-lambda');

exports.handler = async function (event, context) {

  // const params = JSON.parse(event.body);
  // const pageToScrape = params.pageToScrape;
  let url = event.queryStringParameters.url;

  let title = null;
  let browser = null;
  
  try {
    browser = await playwright.launchChromium();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    title = await page.$eval('body', b => {
      return b.querySelector('h1').innerText;
    });
  

  } catch (error) {
    throw error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      title: title
    })
  };

};
const playwright = require('playwright-aws-lambda');
const fs = require('fs');

exports.handler = async function (event, context) {
  let url = event.queryStringParameters.url;

  let image = null;
  let browser = null;
  
  try {
    browser = await playwright.launchChromium();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    image = await page.$eval('head', b => {
      return b.querySelector('meta[property="og:image"]').getAttribute('content');
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
      image: image
    })
  };
};
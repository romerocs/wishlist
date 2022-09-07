const playwright = require('playwright-aws-lambda');
const fs = require('fs');

exports.handler = async function (event, context) {
  let url = event.queryStringParameters.url;

  let meta_image = null;
  let main_image = null;
  let browser = null;
  
  try {
    browser = await playwright.launchChromium();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    meta_image = await page.$eval('head', b => {
      return b.querySelector('meta[property="og:image"]').getAttribute('content');
    });

    main_image = await page.$eval('body', b => {
      return b.querySelector('img').getAttribute('src');
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
      meta_image: meta_image,
      main_image: main_image
    })
  };
};
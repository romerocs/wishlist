const playwright = require('playwright-aws-lambda');

exports.handler = async function (event, context) {
  let url = event.queryStringParameters.url;

  let title = null;
  let browser = null;
  
  try {
    browser = await playwright.launchChromium();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    title = await page.$eval('head', b => {
      return b.querySelector('title').innerText;
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
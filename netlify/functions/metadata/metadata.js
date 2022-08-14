const playwright = require('playwright');

exports.handler = async function (event, context) {

    let title = null;

    async function main() {
      const browser = await playwright.chromium.launch({
          headless: true // setting this to true will not run the UI
      });
      
      const page = await browser.newPage();
      await page.goto('https://www.example.com');

      title = await page.$eval('body', b => {
        return b.querySelector('h1').innerText;
      });

      await page.waitForTimeout(5000); // wait for 5 seconds
      await browser.close();
  }

  await main();

  return {
    statusCode: 200,
    body: JSON.stringify({
      title: title
    })
  }

};
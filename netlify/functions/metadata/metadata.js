const { chromium } = require('playwright-core');
const bundledChromium = require('chrome-aws-lambda');

exports.handler = async function (event, context) {

    let title = null;

    async function main() {
      const path = process.env.CHROME_EXECUTABLE_PATH || await bundledChromium.executablePath;

      const browser = await Promise.resolve(path).then(
        (executablePath) => {
          if (!executablePath) {
            // local execution
            return chromium.launch({});
          }
          return chromium.launch({ executablePath });
        }
      );
      
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
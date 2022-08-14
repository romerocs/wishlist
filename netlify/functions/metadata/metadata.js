const { PlaywrightCrawler } = require('crawlee');

exports.handler = async function (event, context) {
  let data = null;
  // Create an instance of the PlaywrightCrawler class - a crawler
  // that automatically loads the URLs in headless Chrome / Playwright.
  const crawler = new PlaywrightCrawler({
      launchContext: {
          // Here you can set options that are passed to the playwright .launch() function.
          launchOptions: {
              headless: true,
          },
      },
  
      // Stop crawling after several pages
      maxRequestsPerCrawl: 50,
  
      async requestHandler({ request, page, enqueueLinks, log }) {
          log.info(`Processing ${request.url}...`);
  
          // A function to be evaluated by Playwright within the browser context.
          data = await page.$$eval('body', ($body) => {

              const scrapedData = [];

              $body.forEach(($b) => {
                  scrapedData.push({
                      title: $b.querySelector('h1').innerText
                  });
              });
  
              return scrapedData;
          });
      },
  
      // This function is called if the page processing failed more than maxRequestRetries+1 times.
      failedRequestHandler({ request, log }) {
          log.info(`Request ${request.url} failed too many times.`);
      },
  });
  
  await crawler.addRequests(['http://www.example.com']);
  
  // Run the crawler and wait for it to finish.
  await crawler.run();
  
  console.log('Crawler finished.');

  return {
    statusCode: 200,
    body: JSON.stringify({
      body: data
    })
  }

};
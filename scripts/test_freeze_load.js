import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    // Inject a heartbeat BEFORE loading
    await page.addInitScript(() => {
      window.heartbeat = setInterval(() => {
        console.log('Heartbeat...');
      }, 500);
    });

    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    console.log('Page DOM loaded');
    
    // Wait for 5 seconds to see if heartbeats continue
    await page.waitForTimeout(5000);
    console.log('Finished waiting. If you saw heartbeats, main thread is NOT frozen.');
    await page.screenshot({ path: 'screenshot_load.png' });
  } catch (err) {
    console.log('Script Error:', err);
  } finally {
    await browser.close();
  }
})();

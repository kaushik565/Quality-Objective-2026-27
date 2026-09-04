import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    console.log('Page loaded');
    
    // Inject a heartbeat to check if main thread is blocked
    await page.evaluate(() => {
      window.heartbeat = setInterval(() => {
        console.log('Heartbeat...');
      }, 500);
    });
    
    await page.waitForTimeout(1000);
    console.log('Clicking Site V...');
    await page.getByText('Site V').click();
    
    await page.waitForTimeout(3000);
    console.log('Finished waiting. If you saw heartbeats after clicking, main thread is NOT frozen.');
  } catch (err) {
    console.log('Script Error:', err);
  } finally {
    await browser.close();
  }
})();

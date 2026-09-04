import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('UNCAUGHT PAGE ERROR:', err.message);
  });

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    console.log('Page loaded');
    
    // Click SKIP INTRO if it's there
    const skipBtn = page.locator('text="SKIP INTRO"');
    if (await skipBtn.count() > 0) {
      await skipBtn.click();
      console.log('Clicked SKIP INTRO');
    }
    
    // In Reveal.js, we might need to navigate to the IPQA slide.
    // Or we can just try to find "Site V" directly if it's rendered.
    // Wait for Site V to be visible in the DOM
    await page.waitForTimeout(1000);
    
    // Press ArrowRight a few times to get to IPQA slide
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500);
    }
    
    const cards = await page.locator('text="Site V"').all();
    if (cards.length > 0) {
      await cards[0].click({ force: true });
      console.log('Clicked Site V');
    } else {
      console.log('Could not find Site V text');
    }
    
    // Inject a heartbeat to check if main thread is blocked
    await page.evaluate(() => {
      window.heartbeat = setInterval(() => {
        console.log('Heartbeat...');
      }, 500);
    });
    
    // Wait a bit for crash to happen
    await page.waitForTimeout(3000);
    console.log('Done waiting. If you saw heartbeats, it did NOT freeze.');
    await page.screenshot({ path: 'screenshot2.png' });
  } catch (err) {
    console.log('Script Error:', err);
  } finally {
    await browser.close();
  }
})();

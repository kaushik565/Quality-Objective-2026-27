import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    console.log('Page loaded');
    
    // Find the Site V card carefully
    const cards = await page.locator('text="Site V"').all();
    if (cards.length > 0) {
      await cards[0].click({ force: true });
      console.log('Clicked Site V');
    } else {
      console.log('Could not find Site V text');
    }
    
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot saved to screenshot.png');
  } catch (err) {
    console.log('Script Error:', err);
  } finally {
    await browser.close();
  }
})();

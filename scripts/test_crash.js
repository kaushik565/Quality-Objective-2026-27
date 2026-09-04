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
    
    // Find the Site V card and click it. 
    // We can just look for text "Site V"
    await page.getByText('Site V').click();
    console.log('Clicked Site V');
    
    // Wait a bit for crash to happen
    await page.waitForTimeout(3000);
    console.log('Done waiting');
  } catch (err) {
    console.log('Script Error:', err);
  } finally {
    await browser.close();
  }
})();

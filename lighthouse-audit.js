const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

(async () => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'], port: chrome.port };
    const runnerResult = await lighthouse('https://your-website.com', options);

    // Save the report as an HTML file
    fs.writeFileSync('lighthouse-report.html', runnerResult.report);

    console.log('Lighthouse report generated!');
    await chrome.kill();
})();

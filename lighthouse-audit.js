// May 2, 2025
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import fs from 'fs';
import express from 'express';
const app = express();


app.get('/lighthouse', async (req, res) => {
    try {
        const url = req.query.url;
        const report = await runLighthouse(url);
        res.json(report);
    } catch (error) {
        res.status(500).send(err.toString());
    }
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


const report = await runLighthouse(url);
fs.writeFileSync('lighthouse-report.json', JSON.stringify(report, null, 2));

import { run } from 'axe-core';

async function runLighthouse(url) {
    const chrome = await launch({ chromeFlags: ['--headless'] });
    const options = {
        logLevel: 'info',
        output: 'html',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
        port: chrome.port,
    };
    const runnerResult = await lighthouse(url, options);
    await chrome.kill();
    return runnerResult.lhr;
}

runLighthouse('https://your-website.com')
    .then(results => console.log(results.categories))
    .catch(err => console.error('Error running Lighthouse:', err));





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
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--remote-debugging-port=9222'] });
    const page = await browser.newPage();

    // Perform login or other interactions here
    await page.goto('https://your-website.com/login');
    await page.type('#username', 'your-username');
    await page.type('#password', 'your-password');
    await page.click('#login-button');
    await page.waitForNavigation();

    const { lhr, report } = await lighthouse(page.url(), {
        port: 9222,
        output: 'html',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
    });

    fs.writeFileSync('lighthouse-report.html', report);

    await browser.close();
})();
const express = require('express');
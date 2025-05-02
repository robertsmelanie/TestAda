
const express = require('express');
const { JSDOM } = require('jsdom');
const axe = require('axe-core');

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname))); // serves index.html and script.js from your folder

app.get('/api/analyze', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing URL' });
    try {
        const response = await fetch(url);
        const html = await response.text();
        const { window } = new JSDOM(html, { runScripts: 'dangerously' });
        // Inject axe-core source
        const script = window.document.createElement('script');
        script.textContent = axe.source;
        window.document.head.appendChild(script);
        // Run accessibility check
        const results = await window.eval(`axe.run()`);
        // Simplify results
        const issues = results.violations.map(v => ({
            issue: v.description,
            recommendation: v.help
        }));
        // Compute grade simple example
        const grade = computeGrade(issues.length);
        res.json({ grade, issues, reportUrl: null });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

function computeGrade(count) {
    if (count === 0) return 'A';
    if (count < 5) return 'B';
    if (count < 10) return 'C';
    return 'D';
}

app.get(api.lighthouse, async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing URL' });
    try {
        const response = await fetch(url);
        const html = await response.text();
        const { window } = new JSDOM(html, { runScripts: 'dangerously' });
        // Inject lighthouse source
        const script = window.document.createElement('script');
        script.textContent = lighthouse.source;
        window.document.head.appendChild(script);
        // Run lighthouse check
        const results = await window.eval(`lighthouse.run()`);
        // Simplify results
        const issues = results.violations.map(v => ({
            issue: v.description,
            recommendation: v.help
        }));
        // Compute grade simple example
        const grade = computeGrade(issues.length);
        res.json({ grade, issues, reportUrl: null });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server listening on port 3000'));

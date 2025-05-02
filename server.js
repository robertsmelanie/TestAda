// This file is a temporary test the real server file is serverTemp.js 

import express from 'express';
import { runLighthouse } from './lighthouse-audit.js';
import pa11y from 'pa11y';

const app = express();
app.use(express.static('public')); // if your index.html lives in ./public/

app.get('/a11y', async (req, res) => {
    const url = req.query.url;
    const results = await pa11y(url);          // Pa11y returns JSON results :contentReference[oaicite:3]{index=3}
    res.json(results);
});

app.get('/lighthouse', async (req, res) => {
    const url = req.query.url;
    const report = await runLighthouse(url);
    res.json(report);
});

app.listen(3000, () => console.log('Server listening on http://localhost:3000'));
(function () {
    // Grab UI elements
    const urlInput = document.getElementById('ac-url');
    const scanBtn = document.getElementById('ac-scan-btn');
    const spinner = document.getElementById('ac-spinner');
    const report = document.getElementById('ac-report');
    const gradeEl = document.getElementById('ac-grade');
    const issuesList = document.getElementById('ac-issues');
    const recsDiv = document.getElementById('ac-recs');
    const downloadBtn = document.getElementById('ac-download');
    const auditBtn = document.getElementById('ac-request-audit');
    const pluginsLink = document.getElementById('ac-plugins');

    // Hide report and spinner at start
    report.style.display = 'none';
    spinner.style.display = 'none';

    scanBtn.addEventListener('click', async function () {
        const url = urlInput.value.trim();
        if (!/^https?:\/\//.test(url)) {
            alert('Please enter a valid URL, including http:// or https://');
            return;
        }
        report.style.display = 'none';
        spinner.style.display = 'block';

        try {
            const res = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
            if (!res.ok) throw new Error('Server error');
            const data = await res.json();

            spinner.style.display = 'none';
            // Update UI with results
            gradeEl.textContent = 'Grade: ' + (data.grade || '?');
            issuesList.innerHTML = '';
            recsDiv.innerHTML = '';
            if (!data.issues || !data.issues.length) {
                issuesList.innerHTML = '<li>No major issues detected.</li>';
                recsDiv.innerHTML = '<p>Great job! Your site is mostly accessible.</p>';
            } else {
                data.issues.forEach(({ issue, recommendation }) => {
                    const li = document.createElement('li');
                    li.textContent = issue;
                    issuesList.appendChild(li);
                    const p = document.createElement('p');
                    p.textContent = recommendation;
                    recsDiv.appendChild(p);
                });
            }
            report.style.display = 'block';
        } catch (err) {
            spinner.style.display = 'none';
            alert('Error: ' + err.message);
        }
    });

    // Placeholder buttons
    downloadBtn.onclick = () => alert('PDF download coming soon!');
    auditBtn.onclick = () => prompt('Enter your email to request a full audit:');
    pluginsLink.onclick = (e) => { e.preventDefault(); alert('Plugins and fixes coming soon!'); };
})();




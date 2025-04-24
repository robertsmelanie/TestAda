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








// (function () {
//     // Cache DOM nodes only once
//     const urlInput = document.getElementById('ac-url');
//     const scanBtn = document.getElementById('ac-scan-btn');
//     const spinner = document.getElementById('ac-spinner');
//     const report = document.getElementById('ac-report');
//     const gradeEl = document.getElementById('ac-grade');
//     const issuesList = document.getElementById('ac-issues');
//     const recsDiv = document.getElementById('ac-recs');
//     const downloadBtn = document.getElementById('ac-download');
//     const auditBtn = document.getElementById('ac-request-audit');
//     const pluginsLink = document.getElementById('ac-plugins');

//     // Simple URL validation regex
//     const urlPattern = /^https?:\/\/[\w.-]+(?:\/[\w.-]*)*\/?$/;

//     // Debounce helper
//     function debounce(fn, delay) {
//         let timer;
//         return (...args) => {
//             clearTimeout(timer);
//             timer = setTimeout(() => fn(...args), delay);
//         };
//     }

//     // Main scan handler, debounced to 300ms
//     const handleScan = debounce(async () => {
//         const url = urlInput.value.trim();
//         if (!urlPattern.test(url)) {
//             return alert('Please enter a valid URL (including http:// or https://)');
//         }
//         report.style.display = 'none';
//         spinner.style.display = 'block';

//         try {
//             const res = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
//             const type = res.headers.get('content-type') || '';
//             if (!type.includes('application/json')) {
//                 const text = await res.text();
//                 throw new Error('Expected JSON but received: ' + text);
//             }
//             const data = await res.json();
//             spinner.style.display = 'none';
//             updateReport(data);
//         } catch (err) {
//             spinner.style.display = 'none';
//             console.error(err);
//             alert('Error fetching report: ' + err.message);
//         }
//     }, 300);

//     scanBtn.addEventListener('click', handleScan);

//     // Render results
//     function updateReport(data) {
//         gradeEl.textContent = 'Grade: ' + (data.grade || '?');
//         issuesList.innerHTML = '';
//         recsDiv.innerHTML = '';
//         const issues = Array.isArray(data.issues) ? data.issues : [];
//         if (issues.length === 0) {
//             issuesList.innerHTML = '<li>No major issues detected.</li>';
//             recsDiv.innerHTML = '<p>Great job! Your site is mostly accessible.</p>';
//         } else {
//             issues.forEach(({ issue, recommendation }) => {
//                 const li = document.createElement('li');
//                 li.textContent = issue;
//                 issuesList.appendChild(li);
//                 const p = document.createElement('p');
//                 p.textContent = recommendation;
//                 recsDiv.appendChild(p);
//             });
//         }
//         downloadBtn.onclick = () => data.reportUrl ? window.open(data.reportUrl) : alert('Report URL not available');
//         report.style.display = 'block';
//     }

//     auditBtn.addEventListener('click', () => prompt('Enter email to request full audit:'));
//     pluginsLink.addEventListener('click', e => { e.preventDefault(); alert('Affiliate link placeholder'); });
// })();






// Replace simulation logic with real API call to your server-side endpoint
// document.getElementById('ac-scan-btn').addEventListener('click', () => {
//     const url = document.getElementById('ac-url').value.trim();
//     if (!url) {
//         alert('Please enter a valid URL');
//         return;
//     }

//     // Reset UI state
//     document.getElementById('ac-report').style.display = 'none';
//     document.getElementById('ac-spinner').style.display = 'block';

//     // Trigger backend analysis
//     fetch(`/api/analyze?url=${encodeURIComponent(url)}`)
//         .then(res => {
//             const contentType = res.headers.get('content-type') || '';
//             if (contentType.includes('application/json')) {
//                 return res.json();  // Safe JSON parse
//             }
//             // If response isn't JSON, capture raw text for debugging
//             return res.text().then(text => {
//                 throw new Error('Expected JSON but received: ' + text);
//             });
//         })
//         .then(data => {
//             document.getElementById('ac-spinner').style.display = 'none';
//             displayReport(data);
//         })
//         .catch(err => {
//             document.getElementById('ac-spinner').style.display = 'none';
//             console.error('Fetch error:', err);
//             alert('Error fetching report: ' + err.message);
//         });
// });

// /**
//  * displayReport - Renders the audit results into the widget
//  * @param {{ grade: string, issues: Array<{issue: string, recommendation: string}>, reportUrl?: string }} data
//  */
// function displayReport(data) {
//     // Grade
//     const gradeEl = document.getElementById('ac-grade');
//     gradeEl.innerText = 'Grade: ' + (data.grade || '?');

//     // Issues list and recommendations
//     const issuesList = document.getElementById('ac-issues');
//     const recsDiv = document.getElementById('ac-recs');
//     issuesList.innerHTML = '';
//     recsDiv.innerHTML = '';

//     const issues = Array.isArray(data.issues) ? data.issues : [];
//     if (!issues.length) {
//         issuesList.innerHTML = '<li>No major issues detected.</li>';
//         recsDiv.innerHTML = '<p>Great job! Your site is mostly accessible. Consider manual review for deeper insights.</p>';
//     } else {
//         issues.forEach(item => {
//             const li = document.createElement('li');
//             li.innerText = item.issue;
//             issuesList.appendChild(li);

//             const p = document.createElement('p');
//             p.innerText = item.recommendation;
//             recsDiv.appendChild(p);
//         });
//     }

//     // PDF download link
//     document.getElementById('ac-download').onclick = () => {
//         if (data.reportUrl) {
//             window.open(data.reportUrl, '_blank');
//         } else {
//             alert('Report URL not available');
//         }
//     };

//     // Reveal report
//     document.getElementById('ac-report').style.display = 'block';
// }

// // Email audit request
// document.getElementById('ac-request-audit').addEventListener('click', () => {
//     prompt('Enter email to request full audit:');
// });

// // Affiliate plugins link
// document.getElementById('ac-plugins').addEventListener('click', e => {
//     e.preventDefault();
//     alert('Affiliate link placeholder');
// });



// document.getElementById('ac-scan-btn').addEventListener('click', () => {
//     const url = document.getElementById('ac-url').value.trim();
//     if (!url) return alert('Please enter a valid URL');
//     document.getElementById('ac-report').style.display = 'none';
//     document.getElementById('ac-spinner').style.display = 'block';

//     // Call your backend proxy to fetch and run axe-core on the target site
//     fetch(`/api/analyze?url=${encodeURIComponent(url)}`)
//         .then(res => res.json())
//         .then(data => {
//             document.getElementById('ac-spinner').style.display = 'none';
//             displayReport(data);
//         })
//         .catch(err => {
//             document.getElementById('ac-spinner').style.display = 'none';
//             alert('Error fetching report: ' + err.message);
//         });
// });

// function displayReport(data) {
//     // data: { grade: 'A', issues: [ { issue, recommendation } ], reportUrl }
//     document.getElementById('ac-grade').innerText = 'Grade: ' + data.grade;
//     const issuesList = document.getElementById('ac-issues');
//     const recsDiv = document.getElementById('ac-recs');
//     issuesList.innerHTML = '';
//     recsDiv.innerHTML = '';

//     if (!data.issues.length) {
//         issuesList.innerHTML = '<li>No major issues detected.</li>';
//         recsDiv.innerHTML = '<p>Great job! Your site is mostly accessible. Consider manual review for deeper insights.</p>';
//     } else {
//         data.issues.forEach(item => {
//             const li = document.createElement('li'); li.innerText = item.issue;
//             issuesList.appendChild(li);
//             const p = document.createElement('p'); p.innerText = item.recommendation;
//             recsDiv.appendChild(p);
//         });
//     }

//     // Hook up PDF download if server returns a report URL
//     document.getElementById('ac-download').onclick = () => {
//         window.open(data.reportUrl || '#', '_blank');
//     };

//     document.getElementById('ac-report').style.display = 'block';
// }

// // Placeholder actions
// document.getElementById('ac-request-audit').addEventListener('click', () => {
//     prompt('Enter email to request full audit:');
// });
// document.getElementById('ac-plugins').addEventListener('click', e => {
//     e.preventDefault(); alert('Affiliate link placeholder');
// });
        
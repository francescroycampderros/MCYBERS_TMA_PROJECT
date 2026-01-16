document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');

    // get current tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        const url = new URL(activeTab.url);
        const domain = url.hostname;

        app.innerHTML = `<div class="loading">Checking database for ${domain}...</div>`;

        fetch(`http://localhost:3000/api/scan/${domain}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No scan data found for this domain.');
                }
                return response.json();
            })
            .then(result => {
                const data = result.data;
                const score = data.scorecard ? data.scorecard.total_score : '?';
                const max = data.scorecard ? data.scorecard.max_score : 34;
                const level = data.scorecard ? data.scorecard.compliance_level : 'Unknown';

                app.innerHTML = `
          <div class="domain-name">${domain}</div>
          <div class="score-circle">
            <span class="score-val">${score}</span>
            <span class="score-max">/ ${max}</span>
          </div>
          <div class="risk-level">${level}</div>
          <a href="http://localhost:5173" target="_blank" class="btn">View Full Report</a>
        `;
            })
            .catch(err => {
                app.innerHTML = `
          <div class="domain-name">${domain}</div>
          <div class="error">
            <p><strong>Not Scanned Yet</strong></p>
            <p>We don't have analysis data for this site in our database.</p>
          </div>
          <br>
          <a href="http://localhost:5173" target="_blank" class="btn">Start New Audit</a>
        `;
            });
    });
});

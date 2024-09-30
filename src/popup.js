'use strict';

{
  // Functions
  function search() {
    let query = document.querySelector('#search-query').value;
    let search_query = 'https://www.google.com/search?q=';

    const official_docs = {
      "html-css-js": "https://developer.mozilla.org/",
      "bootstrap-5": "https://getbootstrap.com/docs/5.3/",
      "node-js": "https://nodejs.org/",
      // "node-js": "https://nodejs.org/docs/latest/api/",
      // "npm": "https://www.npmjs.com/",
      "npm": "https://docs.npmjs.com/",
      "vite": "https://vitejs.dev/",
      "php": "https://www.php.net/",
      "laravel-11": "https://laravel.com/docs/11.x/",
      "python": "https://docs.python.org/",
      "mysql": "https://dev.mysql.com/",
      "docker": "https://docs.docker.com/",
      "mamp": "https://documentation.mamp.info/",
      "git": "https://git-scm.com/",
      "chart-js": "https://www.chartjs.org/",
      "openai": "https://platform.openai.com/",
      // "wordpress": "https://wordpress.org/documentation/",
    };

    const selected_docs = [];

    Object.keys(official_docs).forEach(tech => {
      let tech_checkbox = document.querySelector(`#${tech}`);

      if (tech_checkbox.checked) {
        selected_docs.push(`site:${official_docs[tech]}`);
      }
    });

    // Generate search query
    if (selected_docs.length >= 1) {
      search_query += selected_docs.join(" OR ") + " " + encodeURIComponent(query);
    } else {
      search_query += encodeURIComponent(query);
    }

    chrome.tabs.create({ url: search_query });
  }



  // ==== Main ====
  document.addEventListener('DOMContentLoaded', () => {
    const btn_search = document.querySelector('#btn-search');
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    // Search Start
    btn_search.addEventListener('click', () => {
      search();
    });

    // Save and Load status of Checkboxes
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        // Save status
        chrome.storage.local.set({ [checkbox.id]: checkbox.checked });
      })

      // Load status
      chrome.storage.local.get([checkbox.id], (result) => {
        checkbox.checked = result[checkbox.id] || false;
      });
    });
  });


}

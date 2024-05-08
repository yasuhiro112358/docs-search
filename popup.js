'use strict';

{
  document.addEventListener('DOMContentLoaded', () => {
    let btn_search = document.querySelector('#btn-search');

    btn_search.addEventListener('click', () => {
      search();
    });
  });

  // function search(search_query) {
  function search() {
    // let query = document.getElementById('searchQuery').value;
    let query = document.querySelector('#search-query').value;
    let search_query = 'https://www.google.com/search?q=';

    const official_docs = {
      "html-css-js": "https://developer.mozilla.org/en-US/",
      "bootstrap-5": "https://getbootstrap.com/docs/5.3/",
      "php": "https://www.php.net/manual/en/",
    };

    const selected_docs = [];

    Object.keys(official_docs).forEach(tech => {
      let tech_checkbox = document.querySelector(`#${tech}`);

      if (tech_checkbox.checked) {
        selected_docs.push(`site:${official_docs[tech]}`);
      }

      console.log(selected_docs);
    });

    // Generate search query
    if (selected_docs.length >= 2) {
      search_query += "(" + selected_docs.join(" OR ") + ") " + encodeURIComponent(query);
    } else if (selected_docs.length == 1) {
      search_query += selected_docs.join(" OR ") + " " + encodeURIComponent(query);
    } else {
      search_query += encodeURIComponent(query);
    }

    chrome.tabs.create({ url: search_query });
  }
}





'use strict';

{
  // サイト情報の定義
  const sites = [
    {
      id: "html-css-js",
      labels: ["HTML", "CSS", "JS"],
      url: "https://developer.mozilla.org/",
      color: "#040404",
      textColor: "white",
      group: "FE Dev"
    },
    {
      id: "bootstrap-5",
      labels: ["Bootstrap 5"],
      url: "https://getbootstrap.com/docs/5.3/",
      color: "#6F2CF4",
      textColor: "white",
      group: "FE Dev"
    },
    {
      id: "chart-js",
      labels: ["Chart.js"],
      url: "https://www.chartjs.org/",
      color: "#FF787C",
      textColor: "white",
      group: "FE Dev"
    },
    {
      id: "php",
      labels: ["PHP"],
      url: "https://www.php.net/",
      color: "#7986B8",
      textColor: "white",
      group: "BE Dev"
    },
    {
      id: "laravel-11",
      labels: ["Laravel 11"],
      url: "https://laravel.com/docs/11.x/",
      color: "#EF3D2E",
      textColor: "white",
      group: "BE Dev"
    },
    {
      id: "node-js",
      labels: ["Node.js"],
      url: "https://nodejs.org/",
      color: "#54A345",
      textColor: "white",
      group: "BE Dev"
    },
    {
      id: "npm",
      labels: ["npm"],
      url: "https://docs.npmjs.com/",
      color: "#CB0001",
      textColor: "white",
      group: "BE Dev"
    },
    {
      id: "vite",
      labels: ["Vite"],
      url: "https://vitejs.dev/",
      color: "#636CFF",
      textColor: "white",
      group: "BE Dev"
    },
    {
      id: "python",
      labels: ["Python"],
      url: "https://docs.python.org/",
      color: "#3772A2",
      textColor: "#3772A2",
      backgroundColor: "#FFDF5B",
      group: "BE Dev"
    },
    {
      id: "mysql",
      labels: ["MySQL"],
      url: "https://dev.mysql.com/",
      color: "#01758F",
      textColor: "white",
      group: "BE Dev"
    },
    {
      id: "openai",
      labels: ["OpenAI"],
      url: "https://platform.openai.com/",
      color: "#000000",
      textColor: "white",
      group: "BE Dev"
    },
    {
      id: "docker",
      labels: ["docker"],
      url: "https://docs.docker.com/",
      color: "#1C63ED",
      textColor: "white",
      group: "etc"
    },
    {
      id: "mamp",
      labels: ["MAMP"],
      url: "https://documentation.mamp.info/",
      color: "#F66826",
      textColor: "white",
      group: "etc"
    },
    {
      id: "git",
      labels: ["git"],
      url: "https://git-scm.com/",
      color: "#F54D27",
      textColor: "white",
      group: "etc"
    }
  ];

  // サイトのチェックボックスを生成
  function generateSiteCheckboxes() {
    const siteSelector = document.querySelector('#site-selector');

    // グループごとにサイトを分類
    const groups = {}; // { groupName: [site1, site2, ...] }

    sites.forEach(site => {
      if (!groups[site.group]) {
        groups[site.group] = [];
      }
      groups[site.group].push(site);
    });

    // 各グループのHTMLを生成
    Object.keys(groups).forEach(groupName => {
      // グループコンテナを作成
      const groupDiv = document.createElement('div');
      groupDiv.classList.add('mb-0');

      // グループ見出しを追加
      const h2 = document.createElement('h2');
      h2.classList.add('m-0', 'small', 'text-muted', 'text-center');
      h2.textContent = groupName;
      groupDiv.appendChild(h2);

      // チェックボックスのコンテナを作成
      const checkboxContainer = document.createElement('div');
      checkboxContainer.classList.add('d-flex', 'flex-wrap');

      groups[groupName].forEach(site => {
        // チェックボックスとラベルを作成
        const div = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.classList.add('btn-check');
        input.id = site.id;
        input.value = site.id;

        const label = document.createElement('label');
        label.classList.add('btn', 'btn-outline-primary', 'rounded-1', 'm-1', 'site-label');
        label.setAttribute('for', site.id);

        // カスタムプロパティを設定
        label.style.setProperty('--site-color', site.color);
        label.style.setProperty('--site-text-color', site.textColor || 'white');
        if (site.backgroundColor) {
          label.style.setProperty('--site-background-color', site.backgroundColor);
        }

        // ラベルのテキストを設定
        if (Array.isArray(site.labels)) {
          label.textContent = site.labels.join(' ');
        } else {
          label.textContent = site.labels;
        }

        // コンテナに追加
        div.appendChild(input);
        div.appendChild(label);
        checkboxContainer.appendChild(div);
      });

      groupDiv.appendChild(checkboxContainer);
      siteSelector.appendChild(groupDiv);
    });
  }

  // 検索関数
  function search() {
    let query = document.querySelector('#search-query').value;
    let search_query = 'https://www.google.com/search?q=';

    const selected_docs = [];

    sites.forEach(site => {
      const tech_checkbox = document.querySelector(`#${site.id}`);
      if (tech_checkbox && tech_checkbox.checked) {
        selected_docs.push(`site:${site.url}`);
      }
    });

    // 検索クエリを生成
    if (selected_docs.length >= 1) {
      search_query += selected_docs.join(" OR ") + " " + encodeURIComponent(query);
    } else {
      search_query += encodeURIComponent(query);
    }

    chrome.tabs.create({ url: search_query });
  }

  // メイン処理
  document.addEventListener('DOMContentLoaded', () => {
    generateSiteCheckboxes();

    const btn_search = document.querySelector('#btn-search');
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    // 検索ボタンのイベントリスナー
    btn_search.addEventListener('click', () => {
      search();
    });

    // チェックボックスの状態を保存・復元
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        // 状態を保存
        chrome.storage.local.set({ [checkbox.id]: checkbox.checked });
      });

      // 状態を復元
      chrome.storage.local.get([checkbox.id], (result) => {
        checkbox.checked = result[checkbox.id] || false;
      });
    });
  });
}

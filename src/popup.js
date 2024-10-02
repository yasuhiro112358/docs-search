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
      group: "Languages"
    },
    {
      id: "typescript",
      labels: ["TypeScript"],
      url: "https://www.typescriptlang.org/docs/",
      color: "#3178C6",
      textColor: "white",
      group: "Languages"
    },
    {
      id: "php",
      labels: ["PHP"],
      url: "https://www.php.net/",
      color: "#7986B8",
      textColor: "white",
      group: "Languages"
    },
    {
      id: "python",
      labels: ["Python"],
      url: "https://docs.python.org/",
      color: "#3772A2",
      // textColor: "#3772A2", 
      textColor: "white",
      backgroundColor: "#FFDF5B",
      group: "Languages"
    },
    {
      id: "bootstrap-5",
      labels: ["Bootstrap 5"],
      url: "https://getbootstrap.com/docs/5.3/",
      color: "#6F2CF4",
      textColor: "white",
      group: "Libraries"
    },
    {
      id: "tailwind-css",
      labels: ["Tailwind CSS"],
      url: "https://tailwindcss.com/docs/",
      color: "#37BCF8",
      textColor: "white",
      group: "Libraries"
    },
    {
      id: "jquery",
      labels: ["jQuery"],
      url: "https://api.jquery.com/",
      color: "#0869AD",
      textColor: "white",
      group: "Libraries"
    },
    {
      id: "react",
      labels: ["React"],
      url: "https://react.dev/",
      color: "#58C4DC",
      textColor: "white",
      group: "Libraries"
    },
    {
      id: "chart-js",
      labels: ["Chart.js"],
      url: "https://www.chartjs.org/",
      color: "#FF787C",
      textColor: "white",
      group: "Libraries"
    },
    {
      id: "d3-js",
      labels: ["D3.js"],
      url: "https://d3js.org/",
      color: "#EF7234",
      textColor: "white",
      group: "Libraries"
    },
    {
      id: "three-js",
      labels: ["Three.js"],
      url: "https://threejs.org/docs/",
      color: "black",
      textColor: "white",
      group: "Libraries"
    },
    {
      id: "laravel-11",
      labels: ["Laravel 11"],
      url: "https://laravel.com/docs/11.x/",
      color: "#EF3D2E",
      textColor: "white",
      group: "Frameworks, CMSs and Databases"
    },
    {
      id: "wordpress",
      labels: ["WordPress"],
      url: "https://wordpress.org/documentation/",
      color: "#01759B",
      textColor: "white",
      group: "Frameworks, CMSs and Databases"
    },
    {
      id: "mysql",
      labels: ["MySQL"],
      url: "https://dev.mysql.com/",
      color: "#01758F",
      textColor: "white",
      group: "Frameworks, CMSs and Databases"
    },
    {
      id: "openai",
      labels: ["OpenAI"],
      url: "https://platform.openai.com/",
      color: "#000000",
      textColor: "white",
      group: "APIs"
    },
    {
      id: "google-cloud",
      labels: ["Google Cloud"],
      url: "https://cloud.google.com/docs",
      color: "#007DF6",
      textColor: "white",
      group: "APIs"
    },
    {
      id: "openweathermap",
      labels: ["OpenWeatherMap"],
      url: "https://openweathermap.org/",
      color: "#EB6E4A",
      textColor: "white",
      group: "APIs"
    },
    {
      id: "node-js",
      labels: ["Node.js"],
      url: "https://nodejs.org/",
      color: "#54A345",
      textColor: "white",
      group: "Envs & Tools"
    },
    {
      id: "npm",
      labels: ["npm"],
      url: "https://docs.npmjs.com/",
      color: "#CB0001",
      textColor: "white",
      group: "Envs & Tools"
    },
    {
      id: "vite",
      labels: ["Vite"],
      url: "https://vitejs.dev/",
      color: "#636CFF",
      textColor: "white",
      group: "Envs & Tools"
    },
    {
      id: "docker",
      labels: ["Docker"],
      url: "https://docs.docker.com/",
      color: "#1C63ED",
      textColor: "white",
      group: "Envs & Tools"
    },
    {
      id: "mamp",
      labels: ["MAMP"],
      url: "https://documentation.mamp.info/",
      color: "#F66826",
      textColor: "white",
      group: "Envs & Tools"
    },
    {
      id: "git",
      labels: ["Git"],
      url: "https://git-scm.com/",
      color: "#F54D27",
      textColor: "white",
      group: "Envs & Tools"
    },

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
      groupDiv.classList.add('mb-2');

      // グループ見出しを追加
      const h2 = document.createElement('h2');
      h2.classList.add('text-xs', 'text-gray-500', 'text-center', 'mb-1');
      h2.textContent = groupName;
      groupDiv.appendChild(h2);

      // チェックボックスのコンテナを作成
      const checkboxContainer = document.createElement('div');
      checkboxContainer.classList.add('flex', 'flex-wrap', 'justify-left', 'gap-1');

      groups[groupName].forEach(site => {
        // チェックボックスとラベルを作成
        const div = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.classList.add('hidden');
        input.id = site.id;
        input.value = site.id;

        const label = document.createElement('label');
        label.classList.add('px-4', 'py-2', 'border-2', 'rounded-full', 'cursor-pointer', 'text-md', 'select-none', 'block');
        label.setAttribute('for', site.id);

        // スタイルを適用
        label.style.color = site.color;
        label.style.borderColor = site.color;

        // チェック時のスタイルを設定
        input.addEventListener('change', () => {
          if (input.checked) {
            label.style.backgroundColor = site.color;
            label.style.color = site.textColor || 'white';
          } else {
            label.style.backgroundColor = 'transparent';
            label.style.color = site.color;
          }
        });

        // 初期状態を設定
        label.style.backgroundColor = 'transparent';

        // ラベルのテキストを設定
        label.textContent = site.labels.join(' ');

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

    // Enterキーで検索
    const searchQuery = document.getElementById('search-query');
    searchQuery.addEventListener('keydown', function (event) {
      // Check if the 'Enter' key is pressed
      if (event.key === 'Enter') {
        // Prevent the default action (form submission, etc.)
        event.preventDefault();
        // Trigger the button click
        document.getElementById('btn-search').click();
      }
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
        // チェック状態に応じてスタイルを適用
        checkbox.dispatchEvent(new Event('change'));
      });
    });

    // リセットボタンにイベントリスナーを追加
    document.getElementById('btn-reset').addEventListener('click', function () {
      // フォーム内の全てのチェックボックスを取得
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');

      // 各チェックボックスを未チェックにする
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        // 状態を保存
        chrome.storage.local.set({ [checkbox.id]: checkbox.checked });
        // チェック状態に応じてスタイルを適用
        checkbox.dispatchEvent(new Event('change'));
      });
    });
  });
}

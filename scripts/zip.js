const { zip } = require('zip-a-folder'); // zip-a-folder モジュールをインポート
const path = require('path'); // パス操作用のモジュール

async function createZip() {
  const distDir = path.resolve(__dirname, '../dist'); // ビルド後のディレクトリ
  const outputDir = path.resolve(__dirname, '../releases'); // 出力先のディレクトリ
  const zipFileName = `docs_search_v${require('../package.json').version}.zip`; // バージョン番号付きのファイル名
  const outputZip = path.join(outputDir, zipFileName); // 出力先のファイルパス

  try {
    await zip(distDir, outputZip); // ビルド後のディレクトリを zip に圧縮
    console.log(`Extension successfully zipped to ${outputZip}`);
  } catch (err) {
    console.error('Error while zipping the extension:', err);
  }
}

createZip();

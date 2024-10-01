import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy'; // ファイルコピー用のプラグイン


export default defineConfig({
  root: 'src', // ソースコードのルートディレクトリ
  build: {
    outDir: '../dist', // ビルド後の出力先
    emptyOutDir: true, // ビルド時に出力先ディレクトリを自動でクリア
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup.html'), // popup.html をエントリーポイントに指定
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'manifest.json', dest: '.' }, // distフォルダの直下にコピー
        { src: 'icons', dest: '.' } // iconsフォルダをdistフォルダの直下にコピー
      ],
    }),
  ],
});

import { defineConfig } from 'vite'; // Viteの設定を書くための関数
import { resolve } from 'path'; // パスの解決に使う関数
import { viteStaticCopy } from 'vite-plugin-static-copy'; // ファイルコピー用のプラグイン
import tailwindcss from 'tailwindcss'; // Tailwind CSSのプラグイン
import autoprefixer from 'autoprefixer'; // ベンダープレフィックスを自動で追加するプラグイン

export default defineConfig({
  root: 'src', // ソースコードのルートディレクトリ
  build: {
    outDir: '../dist', // ビルド後の出力先
    emptyOutDir: true, // ビルド時に出力先ディレクトリを自動でクリア
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup.html'), // popup.html をエントリーポイントに指定
      },
      output: {}, // ビルド時の出力
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
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ],
    },
  },
  server: {
    watch: {
      usePolling: true, // ファイルの変更を監視するためにポーリングを有効化
    },
  },
});

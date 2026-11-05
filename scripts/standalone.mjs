import { readFile, writeFile } from 'node:fs/promises';

// ビルド済みのJSとCSSを埋め込み、サーバー不要で開けるHTMLを作成します。
const base = new URL('../dist/', import.meta.url);
let html = await readFile(new URL('index.html', base), 'utf8');
html = html.replace(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g,
  (_, src) => `<!-- script:${src} -->`);
for (const match of [...html.matchAll(/<!-- script:([^ ]+) -->/g)]) {
  const js = await readFile(new URL(match[1].replace(/^\//, ''), base), 'utf8');
  html = html.replace(match[0], () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`);
}
for (const match of [...html.matchAll(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/g)]) {
  const css = await readFile(new URL(match[1].replace(/^\//, ''), base), 'utf8');
  html = html.replace(match[0], () => `<style>${css}</style>`);
}
await writeFile(new URL('../sample.html', import.meta.url), html);
console.log('sample.html を作成しました。ブラウザーで直接開けます。');

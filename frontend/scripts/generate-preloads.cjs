/**
 * Hero セクションで使うフォントの preload リンクを自動生成
 *
 * 使い方: node scripts/generate-preloads.cjs
 */

const fs = require('fs');
const path = require('path');

const HERO_PATH = path.join(__dirname, '../src/components/sections/HeroSection.vue');
const FONTS_SCSS = path.join(__dirname, '../src/assets/styles/_fonts.scss');
const INDEX_HTML = path.join(__dirname, '../index.html');

// HeroSection.vue からテキストを抽出
function extractHeroText() {
  const content = fs.readFileSync(HERO_PATH, 'utf8');

  // <template> 部分を取得
  const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/);
  if (!templateMatch) return '';

  const template = templateMatch[1];

  // HTMLタグを除去してテキストだけ抽出
  const text = template
    .replace(/<[^>]+>/g, ' ')  // タグ除去
    .replace(/\s+/g, '')        // 空白除去
    .replace(/\{[^}]+\}/g, ''); // Vue バインディング除去

  return text;
}

// unicode-range をパース
function parseUnicodeRange(rangeStr) {
  const ranges = [];
  const parts = rangeStr.split(',').map(s => s.trim());

  for (const part of parts) {
    const match = part.match(/U\+([0-9A-Fa-f]+)(?:-([0-9A-Fa-f]+))?/);
    if (match) {
      const start = parseInt(match[1], 16);
      const end = match[2] ? parseInt(match[2], 16) : start;
      ranges.push({ start, end });
    }
  }
  return ranges;
}

// テキストに必要なフォントファイルを特定
function findNeededFonts(text, targetWeights) {
  const codePoints = new Set([...text].map(c => c.codePointAt(0)));
  const css = fs.readFileSync(FONTS_SCSS, 'utf8');

  const needed = new Set();
  const blocks = css.split('@font-face').slice(1);

  for (const block of blocks) {
    const urlMatch = block.match(/url\('([^']+)'\)/);
    const weightMatch = block.match(/font-weight:\s*(\d+)/);
    const rangeMatch = block.match(/unicode-range:\s*([^;]+)/);
    const familyMatch = block.match(/font-family:\s*'([^']+)'/);

    if (!urlMatch) continue;

    const url = urlMatch[1];
    const weight = weightMatch ? weightMatch[1] : '400';
    const family = familyMatch ? familyMatch[1] : '';

    // 対象 weight かチェック
    let isTarget = false;
    for (const tw of targetWeights) {
      if (tw.family && family.includes(tw.family) && weight === tw.weight) {
        isTarget = true;
        break;
      }
    }
    if (!isTarget) continue;

    // unicode-range がなければスキップ（ラテン文字のみのフォント）
    if (!rangeMatch) {
      // Orbitron など英語フォントは常に必要
      if (family === 'Orbitron') {
        needed.add(url);
      }
      continue;
    }

    // unicode-range とマッチするか
    const ranges = parseUnicodeRange(rangeMatch[1]);
    for (const { start, end } of ranges) {
      for (const cp of codePoints) {
        if (cp >= start && cp <= end) {
          needed.add(url);
          break;
        }
      }
    }
  }

  return [...needed].sort();
}

// index.html を更新
function updateIndexHtml(fonts) {
  let html = fs.readFileSync(INDEX_HTML, 'utf8');

  // 既存の preload を削除
  html = html.replace(/\s*<!-- Preload critical fonts[\s\S]*?-->\n(\s*<link rel="preload"[^>]+>\n)*/g, '');

  // 新しい preload を生成
  const preloadLinks = fonts.map(url =>
    `    <link rel="preload" href="${url}" as="font" type="font/woff2" crossorigin />`
  ).join('\n');

  const preloadBlock = `    <!-- Preload critical fonts for Hero section -->\n${preloadLinks}\n\n`;

  // <!-- Fonts are self-hosted の後に挿入
  html = html.replace(
    /(<!-- Fonts are self-hosted via S3\/CloudFront -->\n)/,
    `$1${preloadBlock}`
  );

  fs.writeFileSync(INDEX_HTML, html);
  return fonts.length;
}

// メイン
function main() {
  console.log('Extracting text from HeroSection.vue...');
  const heroText = extractHeroText();
  console.log(`Found ${heroText.length} characters\n`);

  // Hero で使うフォント weight を指定
  // - M PLUS Rounded 1c 700: 見出し
  // - Orbitron 400: 英語アクセント
  const targetWeights = [
    { family: 'M PLUS Rounded 1c', weight: '700' },
    { family: 'Orbitron', weight: '400' },
  ];

  console.log('Finding needed font files...');
  const fonts = findNeededFonts(heroText, targetWeights);

  console.log(`\nNeeded fonts (${fonts.length}):`);
  fonts.forEach(f => console.log('  ' + f));

  console.log('\nUpdating index.html...');
  updateIndexHtml(fonts);

  console.log('Done!');
}

main();

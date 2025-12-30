/**
 * Google Fonts を S3 セルフホスティング用にダウンロードするスクリプト
 * サイトで使われている文字だけを含むサブセットをダウンロード
 *
 * 使い方: node scripts/download-fonts.cjs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, '../public/fonts');
const CSS_OUTPUT = path.join(__dirname, '../src/assets/styles/_fonts.scss');
const SRC_DIR = path.join(__dirname, '../src');

const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&family=Noto+Sans+JP:wght@400&family=Orbitron:wght@400;500&display=swap';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : require('http');
    const options = { headers: { 'User-Agent': USER_AGENT } };

    protocol.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

// サイトで使われている全文字を抽出
function extractUsedCharacters() {
  const chars = new Set();

  function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filepath = path.join(dir, file);
      const stat = fs.statSync(filepath);

      if (stat.isDirectory()) {
        scanDir(filepath);
      } else if (/\.(vue|ts|tsx|js|json)$/.test(file)) {
        const content = fs.readFileSync(filepath, 'utf8');
        for (const char of content) {
          chars.add(char.codePointAt(0));
        }
      }
    }
  }

  scanDir(SRC_DIR);

  // index.html も含める
  const indexPath = path.join(__dirname, '../index.html');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    for (const char of content) {
      chars.add(char.codePointAt(0));
    }
  }

  return chars;
}

// unicode-range を解析して、使用文字と重複するかチェック
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

function isSubsetNeeded(unicodeRange, usedChars) {
  if (!unicodeRange) return true; // unicode-range がなければ必要

  const ranges = parseUnicodeRange(unicodeRange);

  for (const { start, end } of ranges) {
    for (let code = start; code <= end; code++) {
      if (usedChars.has(code)) {
        return true;
      }
    }
  }

  return false;
}

async function downloadFont(url, filename) {
  const buffer = await fetchUrl(url);
  const filepath = path.join(FONTS_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  return { filename, size: buffer.length };
}

async function main() {
  console.log('Extracting used characters from source files...');
  const usedChars = extractUsedCharacters();
  console.log(`Found ${usedChars.size} unique characters\n`);

  // Create fonts directory (clean start)
  if (fs.existsSync(FONTS_DIR)) {
    fs.rmSync(FONTS_DIR, { recursive: true });
  }
  fs.mkdirSync(FONTS_DIR, { recursive: true });

  console.log('Fetching Google Fonts CSS...');
  const css = (await fetchUrl(GOOGLE_FONTS_URL)).toString();

  // Parse CSS and extract font-face declarations
  const fontFaceRegex = /@font-face\s*\{([^}]+)\}/g;
  const urlRegex = /url\(([^)]+)\)/;
  const familyRegex = /font-family:\s*'([^']+)'/;
  const weightRegex = /font-weight:\s*(\d+)/;
  const unicodeRangeRegex = /unicode-range:\s*([^;]+)/;

  const allFontFaces = [];
  let match;
  let fileIndex = 0;

  while ((match = fontFaceRegex.exec(css)) !== null) {
    const block = match[1];

    const urlMatch = block.match(urlRegex);
    const familyMatch = block.match(familyRegex);
    const weightMatch = block.match(weightRegex);
    const unicodeRangeMatch = block.match(unicodeRangeRegex);

    if (urlMatch && familyMatch) {
      const url = urlMatch[1];
      const family = familyMatch[1];
      const weight = weightMatch ? weightMatch[1] : '400';
      const unicodeRange = unicodeRangeMatch ? unicodeRangeMatch[1].trim() : null;

      // Generate filename
      const familySlug = family.toLowerCase().replace(/\s+/g, '-');
      const filename = `${familySlug}-${weight}-${fileIndex}.woff2`;
      fileIndex++;

      allFontFaces.push({
        url,
        family,
        weight,
        unicodeRange,
        filename,
        needed: isSubsetNeeded(unicodeRange, usedChars)
      });
    }
  }

  const neededFonts = allFontFaces.filter(f => f.needed);
  const skippedCount = allFontFaces.length - neededFonts.length;

  console.log(`Total subsets: ${allFontFaces.length}`);
  console.log(`Needed subsets: ${neededFonts.length}`);
  console.log(`Skipped subsets: ${skippedCount}\n`);

  console.log('Downloading needed font subsets...');
  let totalSize = 0;

  for (const font of neededFonts) {
    const { filename, size } = await downloadFont(font.url, font.filename);
    totalSize += size;
    console.log(`Downloaded: ${filename} (${(size / 1024).toFixed(1)} KB)`);
  }

  console.log(`\nTotal downloaded: ${(totalSize / 1024).toFixed(1)} KB`);

  // Generate SCSS
  let scss = `// Auto-generated font-face declarations\n`;
  scss += `// Generated by: node scripts/download-fonts.cjs\n`;
  scss += `// Only includes subsets for characters used on this site\n\n`;

  for (const font of neededFonts) {
    scss += `@font-face {\n`;
    scss += `  font-family: '${font.family}';\n`;
    scss += `  font-style: normal;\n`;
    scss += `  font-weight: ${font.weight};\n`;
    scss += `  font-display: swap;\n`;
    scss += `  src: url('/fonts/${font.filename}') format('woff2');\n`;
    if (font.unicodeRange) {
      scss += `  unicode-range: ${font.unicodeRange};\n`;
    }
    scss += `}\n\n`;
  }

  fs.writeFileSync(CSS_OUTPUT, scss);
  console.log(`\nGenerated: ${CSS_OUTPUT}`);
  console.log('\nDone!');
}

main().catch(console.error);

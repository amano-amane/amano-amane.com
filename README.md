# amano-amane.com

インディーゲームクリエイター「天野あまね」のポートフォリオサイト。

## Overview

| 項目 | 内容 |
|------|------|
| URL | https://amano-amane.com |
| 構成 | シングルページアプリケーション |
| デザイン | Kawaii Pop × Cyber |

## Tech Stack

### Frontend

- **Vue.js 3** - Composition API
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
- **SCSS** - スタイリング
- **vite-ssg** - 静的サイト生成

### Infrastructure

- **Cloudflare Workers** - ホスティング
- **Cloudflare** - CDN / DNS / SSL
- **Cloudflare Email Routing** - メール転送
- **Route 53** - ドメイン登録

## Getting Started

### 必要環境

- Node.js 18+
- npm

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/amano-amane/amano-amane.com.git
cd amano-amane.com

# 依存関係をインストール
cd frontend
npm install

# 開発サーバー起動
npm run dev
```

http://localhost:5173 でアクセス可能。

### ビルド

```bash
cd frontend
npm run build
```

`dist/` フォルダにビルド成果物が出力される。

## Deployment

GitHub の `main` ブランチにプッシュすると、Cloudflare Workers が自動でビルド・デプロイ。

```bash
git add .
git commit -m "Update: 変更内容"
git push origin main
```

### 手動デプロイ

```bash
cd frontend
npx wrangler deploy
```

## Project Structure

```
mem-portfolio/
├── docs/                     # ドキュメント
│   ├── 01_overview.md
│   ├── 02_requirements.md
│   ├── 03_design.md
│   ├── 04_content.md
│   ├── 05_technical_spec.md
│   ├── 06_aws_setup.md       # 旧構成（非推奨）
│   ├── 07_development_plan.md
│   ├── 08_cloudflare_migration.md
│   └── 09_contact_section_design.md
├── frontend/                 # Vue.js アプリケーション
│   ├── src/
│   │   ├── components/       # コンポーネント
│   │   │   ├── layout/       # ヘッダー、フッター
│   │   │   ├── sections/     # 各セクション
│   │   │   └── ui/           # UI パーツ
│   │   ├── data/             # 静的データ
│   │   ├── types/            # 型定義
│   │   └── assets/styles/    # SCSS
│   ├── wrangler.jsonc        # Cloudflare Workers 設定
│   └── package.json
├── TODO.md                   # タスク管理
└── README.md
```

## Design System

### Colors

| 名前 | HEX | 用途 |
|------|-----|------|
| Mem Pink | `#FF1493` | メインアクセント |
| Cyber Navy | `#1A1B3A` | ベース / テキスト |
| Electric Cyan | `#00D4FF` | ハイライト / リンク |
| Neon Purple | `#A855F7` | サブアクセント |
| Glitch Green | `#4ADE80` | 成功状態 |

### Typography

| 用途 | フォント |
|------|----------|
| 見出し | M PLUS Rounded 1c |
| 本文 | Noto Sans JP |
| アクセント | Orbitron |

## Sections

| セクション | アンカー | 内容 |
|-----------|---------|------|
| Hero | `#hero` | ファーストビュー |
| About | `#about` | 自己紹介 |
| Works | `#works` | 作品一覧 |
| Skills | `#skills` | 技術スタック |
| Links | `#links` | 外部リンク |
| Contact | `#contact` | お問い合わせ |

## Documentation

詳細は `docs/` フォルダを参照:

- [01_overview.md](docs/01_overview.md) - プロジェクト概要
- [02_requirements.md](docs/02_requirements.md) - 機能要件
- [03_design.md](docs/03_design.md) - デザインガイドライン
- [05_technical_spec.md](docs/05_technical_spec.md) - 技術仕様
- [08_cloudflare_migration.md](docs/08_cloudflare_migration.md) - Cloudflare 設定

## License

Private - All rights reserved.

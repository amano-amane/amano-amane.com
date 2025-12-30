# 技術仕様

## アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────┐
│                         ユーザー                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Cloudflare (CDN + SSL)                      │
│                  ・DDoS保護                                 │
│                  ・SSL/TLS終端                              │
│                  ・キャッシュ配信                            │
│                  ・DNS管理                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│               Cloudflare Workers + Assets                   │
│                  ・静的ファイルホスティング                  │
│                  ・Vue.js ビルド成果物                       │
│                  ・GitHub連携で自動デプロイ                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│               Cloudflare Email Routing                      │
│                  ・contact@amano-amane.com                  │
│                  ・Gmail へ転送                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     Route 53                                │
│                  ・ドメイン登録のみ                          │
│                  （DNS は Cloudflare で管理）                │
└─────────────────────────────────────────────────────────────┘
```

---

## 技術スタック

### フロントエンド

| 項目 | 技術 | 理由 |
|------|------|------|
| フレームワーク | Vue.js 3 | 学習目的、Composition API |
| ビルドツール | Vite | 高速ビルド、Vue公式推奨 |
| 言語 | TypeScript | 型安全性 |
| スタイリング | SCSS | 変数・ネスト活用 |

### インフラ（Cloudflare）

| 項目 | サービス | 用途 |
|------|----------|------|
| ホスティング | Cloudflare Workers | 静的ファイル配信 |
| CDN | Cloudflare | キャッシュ、DDoS保護 |
| DNS | Cloudflare | DNS管理 |
| SSL証明書 | Cloudflare | HTTPS化（自動） |
| メール | Email Routing | 転送（Gmail） |
| ドメイン登録 | Route 53 | ドメイン所有 |

---

## ディレクトリ構成

```
amane-portfolio/
├── docs/                    # ドキュメント
├── frontend/                # Vue.jsプロジェクト
│   ├── public/
│   │   ├── favicon.ico
│   │   └── ogp.png
│   ├── src/
│   │   ├── assets/          # 画像、フォント等
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │       ├── _variables.scss
│   │   │       └── global.scss
│   │   ├── components/      # コンポーネント
│   │   │   ├── layout/
│   │   │   │   ├── AppHeader.vue
│   │   │   │   └── AppFooter.vue
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.vue
│   │   │   │   ├── AboutSection.vue
│   │   │   │   ├── WorksSection.vue
│   │   │   │   ├── SkillsSection.vue
│   │   │   │   ├── LinksSection.vue
│   │   │   │   └── ContactSection.vue
│   │   │   └── ui/
│   │   │       ├── WorkCard.vue
│   │   │       ├── SkillIcon.vue
│   │   │       └── LinkButton.vue
│   │   ├── data/            # 静的データ
│   │   │   ├── works.ts
│   │   │   ├── skills.ts
│   │   │   └── links.ts
│   │   ├── types/           # 型定義
│   │   │   └── index.ts
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
└── README.md
```

---

## Cloudflare 構成詳細

### Workers

| 設定項目 | 値 |
|----------|-----|
| プロジェクト名 | amano-amane |
| 設定ファイル | `frontend/wrangler.jsonc` |
| Assets ディレクトリ | `./dist` |
| 自動デプロイ | GitHub main ブランチ連携 |

### DNS

| レコード | タイプ | 値 |
|----------|--------|-----|
| amano-amane.com | Workers カスタムドメイン | - |
| www.amano-amane.com | CNAME → リダイレクト | amano-amane.com |

### Email Routing

| 設定項目 | 値 |
|----------|-----|
| カスタムアドレス | contact@amano-amane.com |
| 転送先 | Gmail |
| DMARC | 有効 |

---

## 非機能要件

### パフォーマンス
- Lighthouse スコア: 90以上
- 画像はWebP形式推奨
- フォントはセルフホスティング（サブセット化）

### セキュリティ
- HTTPS必須（Cloudflare 自動）
- DDoS保護（Cloudflare 標準）
- HSTS 有効

### コスト（月額目安）

| サービス | 概算 |
|----------|------|
| Cloudflare（Free プラン） | $0 |
| Route 53（ドメイン登録のみ） | 年額のみ |
| **合計** | **$0/月** |

---

## 開発コマンド

```bash
# 開発サーバー起動
cd frontend
npm run dev

# ビルド
npm run build

# デプロイ（自動）
git push origin main
# → Cloudflare Workers が自動でビルド・デプロイ

# 手動デプロイ（必要時）
cd frontend
npx wrangler deploy
```

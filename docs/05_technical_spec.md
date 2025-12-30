# 技術仕様

## アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────┐
│                         ユーザー                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CloudFront (CDN)                         │
│                  ・SSL終端 (ACM証明書)                       │
│                  ・キャッシュ配信                            │
│                  ・カスタムドメイン                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      S3 Bucket                              │
│                  ・静的ファイルホスティング                  │
│                  ・Vue.js ビルド成果物                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     Route 53                                │
│                  ・ドメイン管理                              │
│                  ・DNS設定                                  │
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

### インフラ（AWS）

| 項目 | サービス | 用途 |
|------|----------|------|
| ホスティング | S3 | 静的ファイル配信 |
| CDN | CloudFront | キャッシュ、SSL終端 |
| DNS | Route 53 | ドメイン管理 |
| SSL証明書 | ACM | HTTPS化 |

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

## AWS構成詳細

### S3バケット

| 設定項目 | 値 |
|----------|-----|
| バケット名 | amano-amane.com |
| リージョン | ap-northeast-1 |
| 静的ウェブホスティング | 有効 |
| パブリックアクセス | CloudFront経由のみ |

### CloudFront

| 設定項目 | 値 |
|----------|-----|
| オリジン | S3バケット |
| 代替ドメイン名 | amano-amane.com, www.amano-amane.com |
| SSL証明書 | ACM（us-east-1） |
| デフォルトルートオブジェクト | index.html |
| 価格クラス | PriceClass_100 |

### Route 53

| レコード | タイプ | 値 |
|----------|--------|-----|
| amano-amane.com | A | CloudFront（Alias） |
| www.amano-amane.com | A | CloudFront（Alias） |

### ACM（SSL証明書）

| 設定項目 | 値 |
|----------|-----|
| リージョン | us-east-1 |
| ドメイン | amano-amane.com, *.amano-amane.com |
| 検証方法 | DNS検証 |

---

## 非機能要件

### パフォーマンス
- Lighthouse スコア: 90以上
- 画像はWebP形式推奨

### セキュリティ
- HTTPS必須
- S3はCloudFront経由のみ

### コスト（月額目安）

| サービス | 概算 |
|----------|------|
| Route 53 | $0.50 |
| S3 | $0.10以下 |
| CloudFront | 無料枠内 |
| ACM | 無料 |
| **合計** | **$1〜2/月** |

※ 100USDクレジットあり

---

## 開発コマンド

```bash
# 開発サーバー起動
cd frontend
npm run dev

# ビルド
npm run build

# デプロイ
aws s3 sync dist/ s3://amano-amane.com --delete
```

# 開発計画

## 開発ステップ

### Step 1: 環境構築

#### 1-1. Vue.jsプロジェクト作成
```bash
npm create vite@latest frontend -- --template vue-ts
cd frontend
npm install
npm install -D sass
```

#### 1-2. ディレクトリ構成整備
- components/layout/
- components/sections/
- components/ui/
- data/
- types/
- assets/styles/

---

### Step 2: 共通部分の実装

#### 2-1. スタイル基盤
- _variables.scss（カラー、フォント、スペーシング）
- global.scss（リセット、共通スタイル）

#### 2-2. レイアウトコンポーネント
- AppHeader.vue（固定ナビゲーション）
- AppFooter.vue

---

### Step 3: セクション実装

#### 3-1. 各セクションコンポーネント
- HeroSection.vue
- AboutSection.vue
- WorksSection.vue
- SkillsSection.vue
- LinksSection.vue
- ContactSection.vue

#### 3-2. UIコンポーネント
- WorkCard.vue
- SkillIcon.vue
- LinkButton.vue

#### 3-3. データファイル
- works.ts
- skills.ts
- links.ts

---

### Step 4: スタイリング・レスポンシブ

- ポップなカラースキーム適用
- モバイル対応
- ホバーエフェクト
- スムーススクロール

---

### Step 5: SEO・OGP設定

- index.html にmeta設定
- OGP画像配置
- favicon設定

---

### Step 6: AWSインフラ構築

→ 詳細は `06_aws_setup.md` を参照

---

### Step 7: デプロイ・確認

```bash
npm run build
aws s3 sync dist/ s3://amano-mem.com --delete
```

- 表示確認
- レスポンシブ確認
- OGPチェッカーで確認
- Google Analytics設定

---

## 推奨作業順序

AWS関連は時間がかかるため、先に開始：

1. **Route 53 ドメイン購入**
2. **ACM 証明書リクエスト**（検証待ち発生）
3. **Vue.js 開発**（待ち時間に並行作業）
4. **S3 + CloudFront 構築**
5. **DNS設定 + デプロイ**

---

## タスク優先度

### 必須
- [ ] Vue.jsプロジェクト作成
- [ ] 全セクション実装
- [ ] レスポンシブ対応
- [ ] AWSインフラ構築
- [ ] デプロイ

### 推奨
- [ ] OGP設定
- [ ] Google Analytics

### 任意
- [ ] アニメーション
- [ ] スクロール連動演出

---

## 公開前チェックリスト

### 機能
- [ ] 全セクションが表示される
- [ ] ナビゲーションのスムーススクロール動作
- [ ] 外部リンクが正しく開く
- [ ] レスポンシブ表示

### SEO
- [ ] title / description 設定
- [ ] OGP画像表示
- [ ] favicon表示

### インフラ
- [ ] HTTPS接続
- [ ] www有無両対応

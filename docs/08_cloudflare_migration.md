# Cloudflare 移行手順

## 概要

AWS（Route 53 + CloudFront + S3）から Cloudflare への移行手順。
メール設定を含む統合的なインフラ構築を行う。

### 移行後の構成

```
ユーザー
   │
   ▼
Cloudflare（CDN + SSL + DDoS保護）
   │
   ├──→ Cloudflare Pages（静的ホスティング）
   │         ↑
   │     GitHub（自動デプロイ）
   │
   └──→ Email Routing
             │
             ▼
         個人メール（Gmail等）に転送

Route 53（ドメイン登録のみ）
```

### Cloudflare 移行のメリット

| 項目 | AWS | Cloudflare | 改善点 |
|------|-----|------------|--------|
| CDN | CloudFront | Cloudflare CDN | 無料（同等性能） |
| SSL | ACM | Cloudflare SSL | 自動更新・設定不要 |
| ホスティング | S3 | Cloudflare Pages | 無料・GitHub連携 |
| メール | 別途必要 | Email Routing | 無料・転送機能 |
| DDoS保護 | Shield（有料） | 標準搭載 | 無料 |
| 月額コスト | $0.50〜1.00 | $0 | 完全無料 |

### 作業順序

| 順序 | 作業 | 所要時間 |
|------|------|----------|
| 1 | Cloudflare アカウント作成 | 5分 |
| 2 | ドメイン追加・DNS移行 | 10分 |
| 3 | ネームサーバー変更 | 5分 + 伝播待ち |
| 4 | SSL 設定 | 5分 |
| 5 | Email Routing 設定 | 10分 |
| 6 | Cloudflare Pages デプロイ | 15分 |
| 7 | AWS リソース削除 | 10分 |

**合計**: 約1時間 + DNS伝播待ち（最大48時間、通常は数時間）

---

## 事前準備

### 確認事項

- [ ] Route 53 でドメイン `amano-amane.com` を所有していること
- [ ] GitHub にリポジトリがプッシュされていること
- [ ] 現在のサイトが正常に動作していること（移行前の状態確認）

### 現在の DNS レコードをバックアップ

1. AWS Route 53 コンソールを開く
2. ホストゾーン `amano-amane.com` を選択
3. 全レコードをスクリーンショットまたはエクスポート

---

## Step 1: Cloudflare アカウント作成

### 1-1. サインアップ

1. https://dash.cloudflare.com/sign-up にアクセス
2. メールアドレスとパスワードを入力
3. 確認メールのリンクをクリック

### 1-2. アカウント設定

1. ダッシュボードにログイン
2. 右上のアイコン →「My Profile」
3. 「Authentication」→ 二要素認証を有効化（推奨）

---

## Step 2: ドメイン追加・DNS 移行

### 2-1. ドメイン追加

1. Cloudflare ダッシュボード左メニュー「Websites」
2. 「Add a site」をクリック
3. ドメイン名を入力: `amano-amane.com`
4. 「Add site」をクリック

### 2-2. プラン選択

1. **Free** プランを選択
2. 「Continue」をクリック

### 2-3. DNS レコードスキャン

Cloudflare が既存の DNS レコードを自動検出する。

1. スキャン結果を確認
2. 以下のレコードが検出されていることを確認:

| タイプ | 名前 | 内容 | プロキシ |
|--------|------|------|----------|
| A / CNAME | @ | CloudFront ドメイン | オン（オレンジ雲） |
| CNAME | www | CloudFront ドメイン | オン |

3. 不要なレコード（ACM 検証用の CNAME）は削除可
4. 「Continue」をクリック

### 2-4. ネームサーバー確認

Cloudflare が割り当てたネームサーバーが表示される。

```
例:
ns1.cloudflare.com
ns2.cloudflare.com
```

**この値をメモしておく**（次のステップで使用）

---

## Step 3: ネームサーバー変更

### 3-1. Route 53 コンソールを開く

1. AWS マネジメントコンソールにログイン
2. Route 53 →「登録済みドメイン」

### 3-2. ネームサーバー変更

1. `amano-amane.com` を選択
2. 「ネームサーバーの追加/編集」をクリック
3. 既存の Route 53 ネームサーバーを削除
4. Cloudflare のネームサーバーを追加:

```
ns1.cloudflare.com
ns2.cloudflare.com
```

5. 「更新」をクリック

### 3-3. 伝播確認

Cloudflare ダッシュボードで状態を確認:

1. 「Websites」→ `amano-amane.com`
2. ステータスが「Active」になるまで待つ

**確認コマンド（ターミナル）**:
```bash
nslookup -type=NS amano-amane.com
```

Cloudflare のネームサーバーが返ってくれば完了。

### 所要時間

- 通常: 数分〜数時間
- 最大: 48時間（まれ）

---

## Step 4: SSL 設定

### 4-1. SSL/TLS 設定を開く

1. Cloudflare ダッシュボード → `amano-amane.com`
2. 左メニュー「SSL/TLS」→「Overview」

### 4-2. 暗号化モード設定

| モード | 説明 | 推奨 |
|--------|------|------|
| Off | 暗号化なし | ✕ |
| Flexible | Cloudflare↔ユーザー間のみ | ✕ |
| Full | Cloudflare↔オリジン間も暗号化 | △ |
| **Full (strict)** | 正規証明書を検証 | ◎ |

1. **Full (strict)** を選択

> Cloudflare Pages を使用する場合、自動的に正しく設定される

### 4-3. 常時 HTTPS 設定

1. 左メニュー「SSL/TLS」→「Edge Certificates」
2. 「Always Use HTTPS」を **On**
3. 「Automatic HTTPS Rewrites」を **On**
4. 「Minimum TLS Version」を **TLS 1.2** に設定

### 4-4. HSTS 設定（推奨）

1. 同じページで「HTTP Strict Transport Security (HSTS)」
2. 「Enable HSTS」をクリック
3. 設定:

| 項目 | 値 |
|------|-----|
| Max Age | 6 months |
| Include subdomains | On |
| Preload | Off（最初は） |
| No-Sniff | On |

4. 確認チェックを入れて「Save」

---

## Step 5: Email Routing 設定

### 5-1. Email Routing を開く

1. Cloudflare ダッシュボード → `amano-amane.com`
2. 左メニュー「Email」→「Email Routing」

### 5-2. Email Routing 有効化

1. 「Get started」または「Enable Email Routing」をクリック
2. DNS レコード追加の確認 →「Add records and enable」

自動的に以下が追加される:
- MX レコード（メール受信用）
- TXT レコード（SPF）

### 5-3. 転送先メールアドレス追加

1. 「Destination addresses」→「Add destination address」
2. 転送先の個人メールアドレスを入力（例: your-personal@gmail.com）
3. 確認メールが届くのでリンクをクリック

### 5-4. カスタムアドレス作成

1. 「Email Routing」→「Routing rules」
2. 「Create address」をクリック
3. 設定:

| 項目 | 値 |
|------|-----|
| Custom address | `contact` |
| Action | Send to an email |
| Destination | 登録した転送先アドレス |

4. 「Save」

これで `contact@amano-amane.com` 宛のメールが個人メールに転送される。

### 5-5. Catch-all 設定（オプション）

存在しないアドレス宛のメールも受け取りたい場合:

1. 「Routing rules」→「Catch-all address」
2. 「Edit」→「Send to an email」を選択
3. 転送先を指定

### 5-6. 動作確認

1. 別のメールアドレスから `contact@amano-amane.com` にテストメール送信
2. 転送先に届くことを確認

---

## Step 6: Cloudflare Pages デプロイ

### 6-1. Pages プロジェクト作成

1. Cloudflare ダッシュボード左メニュー「コンピューティングとAI」→「Workers & Pages」
2. 「Create application」→「Pages」→「Connect to Git」

### 6-2. GitHub 連携

1. 「Connect GitHub」をクリック
2. GitHub の認証画面が開く
3. 「Authorize Cloudflare Pages」をクリック

### 6-3. GitHub リポジトリへのアクセス許可

1. 「Install & Authorize」画面が表示される
2. アクセス範囲を選択:
   - **All repositories**: すべてのリポジトリにアクセス許可
   - **Only select repositories**: 特定のリポジトリのみ（推奨）
3. 「Only select repositories」を選択した場合:
   - ドロップダウンから `mem-portfolio` を選択
4. 「Install & Authorize」をクリック
5. Cloudflare に戻り、リポジトリ一覧が表示される
6. `mem-portfolio` を選択
7. 「Begin setup」をクリック

### 6-4. ビルド設定

| 項目 | 値 |
|------|-----|
| Project name | `amano-amane` |
| Production branch | `main` |
| Framework preset | Vue |
| Build command | `cd frontend && npm install && npm run build` |
| Build output directory | `frontend/dist` |
| Root directory | `/`（空欄のまま） |

### 6-5. 環境変数（必要な場合）

1. 「Environment variables」を展開
2. 必要な変数があれば追加（現状は不要）

### 6-6. デプロイ

1. 「Save and Deploy」をクリック
2. ビルドログを確認
3. 完了まで待つ（2〜5分）

### 6-7. カスタムドメイン設定

1. Pages プロジェクト →「Custom domains」タブ
2. 「Set up a custom domain」をクリック
3. `amano-amane.com` を入力
4. 「Continue」→「Activate domain」

自動的に DNS レコードが更新される。

### 6-8. www サブドメイン（オプション）

1. 同様に `www.amano-amane.com` も追加
2. または DNS で www → @ へのリダイレクト設定

### 6-9. 動作確認

1. https://amano-amane.com にアクセス
2. サイトが正常に表示されることを確認
3. HTTPS が有効なことを確認（鍵アイコン）

---

## Step 7: AWS リソース削除

> **注意**: サイトが Cloudflare で正常に動作することを確認してから実行

### 7-1. CloudFront ディストリビューション削除

1. CloudFront コンソールを開く
2. ディストリビューションを選択
3. 「Disable」をクリック
4. ステータスが「Disabled」になるまで待つ（数分）
5. 「Delete」をクリック

### 7-2. S3 バケット削除（オプション）

> 今後も S3 を使う可能性があれば保持してもよい

1. S3 コンソールを開く
2. バケット `amano-amane.com` を選択
3. 「空にする」→ 確認テキストを入力して実行
4. 「削除」→ バケット名を入力して実行

### 7-3. ACM 証明書削除

1. ACM コンソールを開く（**us-east-1 リージョン**）
2. 証明書を選択
3. 「削除」→ 確認

### 7-4. Route 53 ホストゾーン削除

> ドメイン登録は Route 53 に残すが、ホストゾーンは不要になる

1. Route 53 コンソール →「ホストゾーン」
2. `amano-amane.com` を選択
3. まず NS と SOA 以外の全レコードを削除
4. ホストゾーンを削除

**注意**: ホストゾーン削除で月額 $0.50 が不要になる

### 7-5. 残すもの

| リソース | 対応 |
|----------|------|
| Route 53 ドメイン登録 | **保持**（年額更新） |
| IAM Identity Center 設定 | 削除可（AWS を使わなくなる場合） |

---

## デプロイ手順（移行後）

### 自動デプロイ

GitHub の `main` ブランチにプッシュすると自動的にデプロイされる。

```bash
# 通常の開発フロー
git add .
git commit -m "Update: 〇〇を修正"
git push origin main

# → Cloudflare Pages が自動検知してビルド・デプロイ
```

### プレビューデプロイ

`main` 以外のブランチにプッシュすると、プレビュー URL が発行される。

```bash
git checkout -b feature/new-section
# 作業...
git push origin feature/new-section

# → https://xxxxx.amano-amane.pages.dev でプレビュー
```

### 手動デプロイ（必要時）

1. Cloudflare ダッシュボード →「Workers & Pages」
2. プロジェクトを選択
3. 「Deployments」→「Retry deployment」

---

## Gmail から独自ドメインで返信する設定

### 前提条件

- Gmail アカウントを持っていること
- Cloudflare Email Routing が設定済みであること

### 設定手順

1. Gmail を開く →「設定」→「すべての設定を表示」
2. 「アカウントとインポート」タブ
3. 「他のメールアドレスを追加」をクリック
4. 設定:

| 項目 | 値 |
|------|-----|
| 名前 | 天野あまね |
| メールアドレス | contact@amano-amane.com |
| エイリアスとして扱う | チェック |

5. 「次のステップ」
6. SMTP サーバー設定:

| 項目 | 値 |
|------|-----|
| SMTP サーバー | smtp.gmail.com |
| ポート | 587 |
| ユーザー名 | あなたの Gmail アドレス |
| パスワード | アプリパスワード（※） |
| TLS | 選択 |

※ Gmail の「2段階認証」→「アプリパスワード」で生成

7. 確認コードがメールで届くので入力
8. 「デフォルトに設定」で返信時に自動で使用される

---

## トラブルシューティング

### ネームサーバー変更後もサイトが表示されない

1. DNS 伝播を確認:
   ```bash
   nslookup amano-amane.com
   ```
2. 時間を置いて再確認（最大48時間）
3. ブラウザのキャッシュをクリア

### Cloudflare Pages のビルドが失敗する

1. ビルドログを確認
2. ローカルで同じコマンドを実行してエラーを再現
3. `node_modules` や `package-lock.json` の問題なら:
   - ローカルで `rm -rf node_modules package-lock.json`
   - `npm install` で再生成
   - プッシュして再ビルド

### メールが届かない

1. Cloudflare Email Routing の「Activity Log」を確認
2. 転送先アドレスの認証が完了しているか確認
3. 迷惑メールフォルダを確認
4. MX レコードが正しく設定されているか確認:
   ```bash
   nslookup -type=MX amano-amane.com
   ```

### SSL エラー（ERR_SSL_VERSION_OR_CIPHER_MISMATCH）

1. SSL/TLS 設定を確認
2. 「Edge Certificates」でユニバーサル証明書が発行されているか確認
3. 発行には最大24時間かかる場合がある

---

## 最終確認チェックリスト

### 基本機能

- [ ] https://amano-amane.com にアクセスできる
- [ ] HTTP → HTTPS リダイレクトが機能している
- [ ] 全セクションが正常に表示される
- [ ] モバイル表示が正常

### メール

- [ ] contact@amano-amane.com にメールが届く
- [ ] 転送先で受信できる
- [ ] Gmail から独自ドメインで返信できる（設定した場合）

### デプロイ

- [ ] GitHub プッシュで自動デプロイされる
- [ ] ビルドが成功する

### AWS クリーンアップ

- [ ] CloudFront ディストリビューションを削除した
- [ ] S3 バケットを削除した（または保持を決定）
- [ ] ACM 証明書を削除した
- [ ] Route 53 ホストゾーンを削除した

---

## コスト比較

### 移行前（AWS）

| サービス | 月額 |
|----------|------|
| Route 53 ホストゾーン | $0.50 |
| Route 53 クエリ | $0.00〜0.10 |
| S3 ストレージ | $0.01〜0.10 |
| CloudFront | 無料枠内 |
| ACM | 無料 |
| メール（別途） | $0〜$6 |
| **合計** | **$0.50〜$7.00/月** |

### 移行後（Cloudflare）

| サービス | 月額 |
|----------|------|
| Cloudflare Free プラン | $0 |
| Cloudflare Pages | $0 |
| Email Routing | $0 |
| Route 53 ドメイン登録 | 年額のみ |
| **合計** | **$0/月** |

**年間節約額**: $6〜$84

---

## 参考リンク

- [Cloudflare Pages ドキュメント](https://developers.cloudflare.com/pages/)
- [Cloudflare Email Routing ドキュメント](https://developers.cloudflare.com/email-routing/)
- [Gmail で他のアドレスから送信](https://support.google.com/mail/answer/22370)

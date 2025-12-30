# ContactSection 詳細設計

## 概要

ポートフォリオサイトのお問い合わせセクション改善設計。
ユーザーが簡単に連絡できる UX を提供する。

---

## 現状の課題

| 課題 | 詳細 |
|------|------|
| シンプルすぎる | 単なる mailto リンクのみ |
| mailto 非対応環境 | メーラーが設定されていないと機能しない |
| 送信のハードル | 何を書けばいいかわからない |

---

## 改善方針

### 設計原則

1. **フリクションを減らす** - テンプレートで入力負担軽減
2. **フォールバック提供** - mailto が動かなくてもコピーで対応
3. **視覚的フィードバック** - 操作結果を明確に伝える

---

## UI 設計

### ワイヤーフレーム

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    ✉️ Contact                               │
│                    お問い合わせ                              │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │       お仕事のご相談はお気軽にどうぞ。                  │  │
│  │       返信にお時間をいただく場合があります。            │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                                                 │  │  │
│  │  │          📧 メールを送る →                      │  │  │
│  │  │                                                 │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  📋 メールアドレスをコピー                       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │                    ── or ──                           │  │
│  │                                                       │  │
│  │         𝕏 Twitter/X の DM でも受け付けています         │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### コンポーネント構成

```
ContactSection.vue
├── 見出し（Contact / お問い合わせ）
├── 説明文
├── ContactCard
│   ├── メール送信ボタン（mailto: テンプレート付き）
│   ├── コピーボタン
│   ├── 区切り線（or）
│   └── Twitter DM リンク
└── 背景装飾
```

---

## 機能仕様

### 1. メール送信ボタン

#### 仕様

| 項目 | 値 |
|------|-----|
| 要素 | `<a href="mailto:...">` |
| スタイル | プライマリボタン（ピンクグラデーション） |
| アイコン | 紙飛行機（PhPaperPlaneTilt） |

#### mailto テンプレート

```
mailto:contact@amano-amane.com
  ?subject=お仕事のご相談
  &body=【お名前】%0A%0A【ご用件】%0A%0A【詳細】%0A
```

**URL エンコード:**
- `%0A` = 改行
- `%20` = スペース

#### 生成される本文

```
【お名前】

【ご用件】

【詳細】

```

---

### 2. コピーボタン

#### 仕様

| 項目 | 値 |
|------|-----|
| 要素 | `<button>` |
| API | `navigator.clipboard.writeText()` |
| スタイル | セカンダリボタン（アウトライン） |
| アイコン | クリップボード（PhClipboard / PhCheck） |

#### 状態遷移

```
[通常] → クリック → [コピー中] → 成功 → [完了表示 2秒] → [通常]
                              → 失敗 → [エラー表示] → [通常]
```

#### UI 状態

| 状態 | テキスト | アイコン | 色 |
|------|----------|----------|-----|
| 通常 | メールアドレスをコピー | 📋 Clipboard | デフォルト |
| 成功 | コピーしました！ | ✓ Check | グリーン |
| 失敗 | コピーできませんでした | ✕ X | レッド |

#### フォールバック

`navigator.clipboard` が使えない環境:
1. `document.execCommand('copy')` を試行
2. それも失敗したらメールアドレスを選択状態にして手動コピーを促す

---

### 3. Twitter DM リンク

#### 仕様

| 項目 | 値 |
|------|-----|
| URL | `https://x.com/messages/compose?recipient_id=XXXXX` |
| 表示 | テキストリンク |
| アイコン | X ロゴ（PhXLogo） |

> **Note**: X アカウント作成後に URL を設定

---

## 実装詳細

### データ構造

```typescript
// src/data/contact.ts
export const contactConfig = {
  email: 'amano.amane44@gmail.com',
  emailSubject: 'お仕事のご相談',
  emailBodyTemplate: `【お名前】

【ご用件】

【詳細】
`,
  twitterUrl: 'https://x.com/messages/compose?recipient_id=XXXXX', // TODO: 設定
  responseTime: '3営業日以内',
};
```

### コンポーネント設計

```typescript
// ContactSection.vue
<script setup lang="ts">
import { ref } from 'vue';
import { contactConfig } from '@/data/contact';

const copyState = ref<'idle' | 'success' | 'error'>('idle');

const mailtoUrl = computed(() => {
  const subject = encodeURIComponent(contactConfig.emailSubject);
  const body = encodeURIComponent(contactConfig.emailBodyTemplate);
  return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
});

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(contactConfig.email);
    copyState.value = 'success';
    setTimeout(() => { copyState.value = 'idle'; }, 2000);
  } catch {
    copyState.value = 'error';
    setTimeout(() => { copyState.value = 'idle'; }, 2000);
  }
};
</script>
```

---

## スタイル設計

### ボタンスタイル

```scss
// メール送信ボタン（プライマリ）
.contact__button-primary {
  background: linear-gradient(135deg, $color-mem-pink, $color-neon-purple);
  color: white;
  padding: $spacing-md $spacing-xl;
  border-radius: $radius-md;
  // ホバー: 浮き上がり + 影強調
}

// コピーボタン（セカンダリ）
.contact__button-secondary {
  background: transparent;
  border: 1px solid rgba($color-soft-white, 0.3);
  color: $color-soft-white;
  padding: $spacing-sm $spacing-lg;
  border-radius: $radius-md;
  // ホバー: ボーダー色変化
}

// 成功状態
.contact__button-secondary--success {
  border-color: $color-glitch-green;
  color: $color-glitch-green;
}
```

### アニメーション

| 要素 | アニメーション |
|------|---------------|
| ボタンホバー | translateY(-2px) + box-shadow 強調 |
| コピー成功 | アイコン回転 + 色変化 |
| 状態遷移 | 0.2s ease |

---

## アクセシビリティ

| 要件 | 対応 |
|------|------|
| キーボード操作 | Tab フォーカス可能、Enter で実行 |
| スクリーンリーダー | aria-label でボタン説明 |
| 色コントラスト | WCAG AA 準拠 |
| フォーカス表示 | outline 表示 |

---

## テスト項目

### 機能テスト

- [ ] メールボタンクリックでメーラーが開く
- [ ] テンプレートが正しく入力されている
- [ ] コピーボタンでクリップボードにコピーされる
- [ ] コピー成功時にフィードバック表示
- [ ] 2秒後に通常状態に戻る
- [ ] Twitter リンクが正しく動作

### 環境テスト

- [ ] Chrome / Firefox / Safari / Edge
- [ ] iOS Safari / Android Chrome
- [ ] メーラー未設定環境でコピーが機能する

---

## 実装チェックリスト

- [ ] `src/data/contact.ts` 作成
- [ ] `ContactSection.vue` 更新
- [ ] コピー機能実装
- [ ] mailto テンプレート実装
- [ ] スタイル調整
- [ ] レスポンシブ確認
- [ ] アクセシビリティ確認

# Webサイト要件定義書（詳細）

## 1. 実装方針

静的サイトとして制作する。

- HTML / CSS / JavaScript
- 画像 / 短い動画 / 試聴プレイヤー / 外部ダウンロードリンク
- GitHub Pages / Netlify / Cloudflare Pages で公開可能な構成
- サーバーサイド処理、WordPress、DB、ログイン機能は初期実装では不要

---

## 2. フォルダ構成

```text
apps/yusha-site/
├─ README.md
├─ PROJECT.md
├─ ASSETS.md              ← アセット配置ガイド
├─ index.html
├─ lyrics.html
├─ archive.html
├─ download.html
├─ player.html
├─ css/style.css
├─ js/main.js
├─ assets/
│  ├─ images/
│  ├─ video/
│  ├─ audio/
│  └─ qr/
└─ data/tracks.json
```

---

## 3. ページ構成

### index.html（トップ）

- QRコードからの入口
- 背景ループ動画（スマホ重い場合は静止画フォールバック）
- タイトル「遊者」、サブ「しかし、遊ぶとは」
- LYRICS / ARCHIVE / DOWNLOAD / PLAYER への導線

### lyrics.html（歌詞）

- 全曲の歌詞、曲ごと見出し、制作年月
- instrumental / intro / outro は明示
- 折りたたみUI可

### archive.html（制作記録）

- 制作年表（PROJECT.md の正本を使用）
- リマスターノート
- 曲ごとの制作メモ（後から追加）

### download.html（購入者限定）

- 外部ZIPリンク（Google Drive / Dropbox 等）
- GitHub Pages にフル音源は置かない
- 簡易パスワード制は任意（導線整理用）

### player.html（試聴）

- HTML `<audio>` タグ
- 30〜60秒プレビューMP3のみ

---

## 4. デザイン要件

### トーン

モノクロ / 薄いグレー / 紙のノイズ / 古い印刷物 / 工業都市 / 余白 / 横書き / 静かな緊張感

- 背景: 白〜薄いグレー（`#f2f1ed` 想定）
- 文字: 黒〜濃いグレー

### フォント（Google Fonts）

| 用途 | フォント |
|------|----------|
| 日本語本文 | Noto Serif JP |
| 日本語見出し | Shippori Mincho |
| 英字・メタ情報 | IBM Plex Mono |

### レイアウト

- スマホQRアクセス最優先
- 1カラム中心、余白広め
- PC: `max-width: 860px` 中央配置

---

## 5. 背景動画仕様

- 形式: mp4 / 5〜10秒 / 音声なし / 5〜10MB以内
- 属性: `autoplay muted loop playsinline`
- 方向: モノクロ、煙、光の揺れ、紙ジャケ、CD、制作机、ノイズ、ほぼ静止画に近い動き

---

## 6. QRコード導線

封入紙にQRコード2つ:

| QR | 推奨URL |
|----|---------|
| QR 1 | トップページ（`/`） |
| QR 2 | ダウンロード（`/download.html`） |

**注意**: 印刷前にURLを確定すること。QRは後から変更不可。

---

## 7. 音源・ダウンロード方針

### GitHub Pages に置くもの

- 試聴用MP3（30〜60秒、128〜192kbps）
- ファイル名は英数字（例: `04-yusha-preview.mp3`）

### 外部ストレージに置くもの

- フル音源 ZIP（MP3 / WAV / ジャケット / 歌詞PDF / 制作メモ / ボーナス素材）
- 初期候補: Google Drive
- 将来候補: BOOTH / Bandcamp / Dropbox / Gumroad

---

## 8. 実装ステップ

1. プロジェクトフォルダ作成 ✅
2. PROJECT.md / README.md 作成 ✅
3. HTML 5ページ + 共通ナビ + CSS
4. アセット配置（ASSETS.md 参照）
5. スマホ表示調整
6. GitHub Pages / Netlify 公開
7. URL確定 → QRコード生成 → 封入紙反映

---

## 9. Cursor 初回実装指示（参考）

```text
PROJECT.md の内容を前提に、静的サイトとして HTML/CSS/JS で実装。
5ページ + 共通ナビ + レスポンシブ + Google Fonts。
歌詞・音源・画像は仮パスでよい。デザインはモノクロ・アーカイブ感。
```

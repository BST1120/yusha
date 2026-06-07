# GitHub Pages 公開ガイド

物体版『遊者』Webアーカイブをインターネット上に公開する手順です。  
**GitHub アカウントがなくても大丈夫** — 最初から順に進めれば公開できます。

---

## 0. 用語の整理（30秒）

| 用語 | 意味 |
|------|------|
| **GitHub** | コードやファイルを保存・共有できるサービス（無料） |
| **リポジトリ（repo）** | 1つのプロジェクト用フォルダ |
| **GitHub Pages** | GitHub上のHTMLをそのままWebサイトとして公開する機能（無料） |
| **公開URL** | `https://BST1120.github.io/リポジトリ名/` の形式 |

---

## 1. 事前準備

### 必要なもの

- GitHub アカウント（[https://github.com/signup](https://github.com/signup) で無料作成）
- `apps/yusha-site/` フォルダ一式（HTML / CSS / JS / 画像）

### ローカルで動作確認（任意）

Cursor のターミナルで:

```powershell
cd e:\somosomo\apps\yusha-site
python -m http.server 8080
```

ブラウザで `http://localhost:8080` を開く。  
（`file://` で直接 HTML を開くと歌詞ページが読み込めない場合があります）

---

## 2. 公開方法（おすすめ: 専用リポジトリ）

Somosomo 全体ではなく、**サイトだけ**を別リポジトリにする方法が最もシンプルです。

### ステップ A — GitHub でリポジトリを作る

1. GitHub にログイン
2. 右上 **+** → **New repository**
3. 設定:
   - **Repository name**: `yusha-site`（URLに使われる）
   - **Public** を選択
   - **Add a README** はオフでOK
4. **Create repository** をクリック

### ステップ B — ファイルをアップロード

1. 作成したリポジトリの画面で **uploading an existing file** をクリック
2. `apps/yusha-site/` の中身を**すべて**ドラッグ＆ドロップ  
   （`index.html` がリポジトリの**直下**に来るようにする）
3. 下の **Commit changes** をクリック

フォルダ構造の例（リポジトリ直下）:

```text
yusha-site/          ← GitHub上のリポジトリ名
├─ index.html        ← ここが重要（直下にあること）
├─ lyrics.html
├─ archive.html
├─ css/
├─ js/
├─ assets/
└─ data/
```

### ステップ C — GitHub Pages を有効化

1. リポジトリの **Settings** タブ
2. 左メニュー **Pages**
3. **Build and deployment** → **Source**:
   - **Deploy from a branch**
4. **Branch**: `main`、フォルダ `/ (root)` を選択 → **Save**
5. 1〜3分待つと、画面上部に公開URLが表示される

**公開URLの例:**

```text
https://BST1120.github.io/yusha-site/
```

---

## 3. サイトを更新する方法

### 方法1: ブラウザから（少量の変更向け）

1. GitHub リポジトリで変更したいファイルを開く
2. 鉛筆アイコン（Edit）→ 編集 → **Commit changes**

### 方法2: 再アップロード

1. ローカルでファイルを編集
2. GitHub で該当ファイルを Upload または Edit で差し替え

### 方法3: Git + Cursor（推奨）

`site.config.json` と `scripts/publish.ps1` が設定済みです。

```powershell
cd e:\somosomo\apps\yusha-site
.\scripts\publish.ps1 -Message "update site"
```

手動で行う場合:

```powershell
cd e:\somosomo\apps\yusha-site
git add .
git commit -m "update site"
git push -u origin main
```

リモート: `https://github.com/BST1120/yusha-site.git`

---

## 4. 公開後にやること

### 4-1. ダウンロードリンクを設定

1. Google Drive / Dropbox に以下をそれぞれアップロード
   - WAV音源（ZIPまたはフォルダ）
   - ジャケット画像
   - 歌詞テキスト
2. 各ファイルの共有リンクを取得
3. `js/config.js` の `downloads` 配列に貼る:

```javascript
downloads: [
  {
    id: "wav",
    label: "WAV",
    description: "全曲のWAV音源",
    url: "https://drive.google.com/...",  // ← WAV用
  },
  {
    id: "jacket",
    label: "ジャケット画像",
    description: "表・裏ジャケット",
    url: "https://drive.google.com/...",  // ← ジャケット用
  },
  {
    id: "lyrics",
    label: "歌詞テキスト",
    description: "全曲の歌詞",
    url: "https://drive.google.com/...",  // ← 歌詞用
  },
],
```

4. GitHub に反映（Commit）

### 4-2. QRコードを作る

URLが確定したら QR を生成:

- [https://www.qrcode-monkey.com/](https://www.qrcode-monkey.com/) など
- **QR 1**: `https://BST1120.github.io/yusha-site/`（トップ）
- **QR 2**: `https://BST1120.github.io/yusha-site/download.html`（DL）

生成したPNGは `assets/qr/` に保存しておくと便利（任意）。

### 4-3. 封入紙にQRを載せる

**URLは印刷後に変更できない**ので、必ず公開・確認してから印刷。

---

## 5. よくある質問

### Q. ページが 404 になる

- Pages 有効化から数分待つ
- `index.html` がリポジトリ**直下**にあるか確認
- Settings → Pages で Branch が `main` / `(root)` か確認

### Q. 画像が表示されない

- ファイル名の大文字小文字が一致しているか（GitHub Pages は区別する）
- パスが `assets/images/...` 形式か確認

### Q. 歌詞ページが「読み込めませんでした」

- `data/tracks.json` がアップロードされているか確認
- ローカルでは `python -m http.server` で確認（`file://` 直開き不可）

### Q. フル音源を GitHub に置いてもいい？

- **非推奨**。URLを知っていれば誰でもDLできる
- 購入者限定ZIPは Google Drive / Dropbox 等の外部リンクを使う

### Q. 独自ドメインは使える？

- 可能（Settings → Pages → Custom domain）
- 初期は `github.io` URL で十分。QR確定後に検討でOK

---

## 6. チェックリスト

- [ ] GitHub リポジトリ作成
- [ ] `yusha-site` 全ファイルアップロード
- [ ] GitHub Pages 有効化
- [ ] 公開URLで全5ページ表示確認
- [ ] スマホで表示確認
- [ ] `js/config.js` に各ダウンロードURLを設定
- [ ] QRコード生成 → 封入紙反映

---

## 7. このサイトのURL一覧（公開後）

| ページ | パス |
|--------|------|
| トップ | `/` または `/index.html` |
| 歌詞 | `/lyrics.html` |
| 制作記録 | `/archive.html` |
| エピローグ（音源制作） | `/archive-track.html?slug=ep-sound` |
| エピローグ（フィジカル製作） | `/archive-track.html?slug=ep-physical` |
| エピローグ（発想） | `/archive-track.html?slug=ep-ideation` |
| エピローグ（発送） | `/archive-track.html?slug=ep-shipping` |
| ダウンロード | `/download.html` |

ベースURLを `{BASE}` とすると、封入紙QRは `{BASE}/` と `{BASE}/download.html` が推奨。

### エピローグの更新方法

`assets/text/epilogue/` 内の `.txt` を編集して GitHub に反映するだけです（歌詞と同じ運用）。

- `01-sound-production.txt` — 音源制作
- `02-physical-production.txt` — フィジカル製作（ステッカー・CD焼き等）
- `03-ideation.txt` — 発想（三百枚売り切り後の感想）
- `04-shipping.txt` — 発送（発送完了後のエピローグ）

# テキストアセット（歌詞・制作記録）

このフォルダに `.txt` を置くと、サイトが自動で読み込んで表示します。  
**UTF-8** で保存してください。

## フォルダ構成

```text
assets/text/
├─ remaster-note.txt          ← Archive「Remaster Note」
├─ epilogue/                  ← アルバム制作を終えて（エピローグ）
├─ lyrics/                    ← 全曲歌詞
└─ production/                ← 曲ごとの制作記録
```

## ファイル名ルール

**`{曲番号}-{slug}.txt`** 形式（波括弧 `{}` は付けない）

正: `04-yusha.txt`  
誤: `{04}-{遊者}.txt`

`data/tracks.json` の `number` と `slug` に対応:

| ファイル名 | 曲 |
|------------|-----|
| `01-inner-image.txt` | inner image (intro) |
| `02-2f.txt` | 2F |
| `03-sappo.txt` | sappo |
| `04-yusha.txt` | 遊者 |
| `05-rooftop.txt` | rooftop (outro) |
| `06-orenoheya.txt` | 俺の部屋 (bonus track) |
| `07-tower.txt` | tower (bonus track) |
| `08-liquid.txt` | Liquid 2026 remaster ver. |

## エピローグ（アルバム制作を終えて）

`assets/text/epilogue/` に4ファイル。歌詞と同様、**テキストを編集して保存 → リロード** で反映されます。

| ファイル | 項目 | 表示URL |
|----------|------|---------|
| `01-sound-production.txt` | 音源制作 | `archive-track.html?slug=ep-sound` |
| `02-physical-production.txt` | フィジカル製作 | `archive-track.html?slug=ep-physical` |
| `03-ideation.txt` | 発想 | `archive-track.html?slug=ep-ideation` |
| `04-shipping.txt` | 発送 | `archive-track.html?slug=ep-shipping` |

発想・発送は、売り切り・発送完了後に追記する想定です。未執筆の間はプレースホルダー文が表示されます。

## 編集の流れ

1. 該当 `.txt` をメモ帳や Cursor で編集
2. 保存（UTF-8）
3. ブラウザをリロードして確認

ローカル確認:

```powershell
cd e:\somosomo\apps\yusha-site
python -m http.server 8080
```

## 表示先

| ファイル | 表示される場所 |
|----------|----------------|
| `lyrics/*.txt` | `lyrics-track.html?slug=...` |
| `production/*.txt` | `archive-track.html?slug=...` |
| `epilogue/*.txt` | `archive-track.html?slug=ep-...`（Archive 全曲リスト下） |
| `remaster-note.txt` | `archive.html` — Remaster Note |

**曲別画像（任意）**

| 用途 | パス例 |
|------|--------|
| 歌詞ページ | `assets/images/tracks/02-2f.jpg` |
| 制作記録ページ | `assets/images/production/02-2f.jpg` |
| エピローグ | `assets/images/production/epilogue/01-sound-production.jpg` |

ファイルが無い・読めない場合は「準備中」と表示されます。

# アセット配置ガイド

このファイルは、**あなたが手元の素材をどのフォルダに入れるか**を示す正本です。
Cursor 実装時は、ここに置いたファイル名を HTML/CSS から参照します。

---

## フォルダ一覧と役割

| フォルダ | 用途 | GitHub に載せる？ |
|----------|------|-------------------|
| `assets/images/` | ジャケット・封入紙・背景テクスチャ・制作写真 | はい（軽量JPEG/PNG） |
| `assets/video/` | トップページ背景ループ動画 | はい（5〜10MB以内） |
| `assets/audio/` | 試聴用プレビューMP3（30〜60秒） | はい |
| `assets/text/lyrics/` | 全曲の歌詞テキスト（.txt） | はい |
| `assets/text/production/` | 曲ごとの制作記録（.txt） | はい |
| `assets/text/remaster-note.txt` | リマスターノート | はい |
| `assets/qr/` | 生成済みQRコード画像（印刷用バックアップ） | 任意 |
| （外部） | 購入者限定フル音源ZIP | **いいえ** → Drive/Dropbox等 |

---

## 1. `assets/images/` に入れるファイル

以下のファイル名で配置してください（未準備のものは後から追加可）。

| ファイル名 | 内容 | 状態 |
|------------|------|------|
| `yusha_cover_front.png` | CDジャケット表 | ✅ 登録済 |
| `yusha_cover_back.png` | CDジャケット裏 | ✅ 登録済 |
| `creative_image_seisakufuukei.png` | 制作机・作業風景 | ✅ 登録済 |
| `creative_image_seisakufuukei.png` | 制作風景（写真） | ✅ 登録済 |
| `booklet-front-back.jpg` | 封入紙（表裏） | 未登録 |
| `booklet-inside.jpg` | 封入紙（内側） | 未登録 |
| `bg-texture.jpg` | 紙・ノイズ背景テクスチャ | 未登録（CSSで代替中） |

**追加してよいもの**

- `sticker-*.png` … ステッカーデザイン
- `blueprint-*.jpg` … 設計図・工業都市イメージ
- `gallery-*.jpg` … 制作写真（将来のギャラリー用）

---

## 2. `assets/video/` に入れるファイル

| ファイル名 | 内容 | 仕様 |
|------------|------|------|
| `yusha-loop.mp4` | トップ背景ループ動画 | mp4 / 5〜10秒 / 無音 / 5〜10MB / モノクロ |

動画が未完成の間は、`bg-texture.jpg` の静止画背景で代替します。

---

## 3. `assets/audio/` に入れるファイル

**プレビュー用のみ**（フル音源は置かない）。

| ファイル名 | 曲 |
|------------|-----|
| `01-inner-image-preview.mp3` | inner image (intro) |
| `02-2f-preview.mp3` | 2F |
| `03-sappo-preview.mp3` | sappo |
| `04-yusha-preview.mp3` | 遊者 |
| `05-rooftop-preview.mp3` | rooftop (outro) |
| `06-orenohēya-preview.mp3` | 俺の部屋 (bonus track) |
| `07-tower-preview.mp3` | tower (bonus track) |
| `08-liquid-preview.mp3` | Liquid 2026 remaster ver. |

- 長さ: 各 30〜60 秒
- 形式: MP3 128〜192 kbps
- ファイル名は英数字のみ（日本語ファイル名は避ける）

---

## 4. `assets/qr/` に入れるファイル（任意）

サイト公開・URL確定後に生成したQRを保管。

| ファイル名 | リンク先 |
|------------|----------|
| `top-page-qr.png` | トップページ URL |
| `download-qr.png` | download.html URL |

封入紙デザイン用。実際の印刷はデザインツール側で行っても可。

---

## 5. 外部ストレージ（GitHub に置かない）

購入者限定 ZIP を1つ用意し、共有リンクを `download.html` に設定。

**ZIP に含める想定内容**

- MP3（フル）
- WAV（フル）
- ジャケット画像
- 歌詞テキスト（PDF or TXT）
- 制作メモ
- ボーナス素材

**推奨ファイル名**: `YUSHA_DOWNLOAD.zip`

**設定場所**: 実装後 `download.html` 内のダウンロードボタン URL、または `js/config.js`（作成予定）

---

## 6. 歌詞・制作記録（テキスト）★重要

**正本ガイド: [`assets/text/README.md`](assets/text/README.md)**

歌詞と制作記録は `.txt` ファイルを置くだけでサイトに反映されます（UTF-8）。

### `assets/text/lyrics/` — 全曲歌詞

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

→ `lyrics.html` で曲名タップ時に表示

### `assets/text/production/` — 曲ごとの制作記録

ファイル名は lyrics と同じ（例: `04-yusha.txt`）

→ `archive.html` の Production Timeline で曲タップ時に表示

### `assets/text/remaster-note.txt`

→ Archive ページ上部の Remaster Note に表示

---

## チェックリスト（素材準備）

- [x] ジャケット表裏画像 → `assets/images/`
- [ ] 封入紙スキャン → `assets/images/`
- [ ] 背景テクスチャ → `assets/images/bg-texture.jpg`
- [ ] ループ動画 → `assets/video/yusha-loop.mp4`
- [ ] 全曲歌詞 → `assets/text/lyrics/*.txt`
- [ ] 曲ごと制作記録 → `assets/text/production/*.txt`
- [ ] リマスターノート → `assets/text/remaster-note.txt`
- [ ] ダウンロードURL → `js/config.js`

# 遊者 / YUSHA — Physical Edition Web Archive

物体版CD封入QRコードからアクセスする、購入者向けWebアーカイブサイト。

## 位置づけ（Somosomo 内）

| 項目 | 内容 |
|------|------|
| パス | `apps/yusha-site/` |
| レイヤー | 実装レイヤー（静的Web） |
| 関連 | `ideas/music/`（アルバムリリースロードマップ） |
| 正本ドキュメント | `PROJECT.md` / `docs/web-requirements.md` |

## 引き継ぎサマリー（2026-06-07）

ChatGPT で整理された内容を Cursor 実装用に引き継ぎ済み。

### やろうとしていること

1. **物体版『遊者』の購入者特典Webページ**を作る（宣伝LPではない）
2. 封入紙のQR → スマホで **歌詞 / 制作記録 / 試聴 / 限定DL** に到達
3. デザインは **モノクロ・紙・工業都市・アーカイブ/資料室** トーン
4. **静的HTML** で GitHub Pages 等に公開
5. **フル音源ZIP** は GitHub に置かず、Google Drive / Dropbox 等の外部リンク

### ページ構成（5ページ）

| ファイル | 役割 |
|----------|------|
| `index.html` | 入口。背景動画。「遊者」「しかし、遊ぶとは」 |
| `lyrics.html` | 全曲歌詞 + 制作年月 |
| `archive.html` | 制作年表・リマスターノート・制作メモ |
| `download.html` | 購入者限定ZIP（外部リンク） |
| `player.html` | 30〜60秒プレビュー試聴 |

### 次の実装ステップ

1. HTML/CSS/JS の MVP 実装（共通ナビ + レスポンシブ）
2. あなたが素材を `assets/` に配置（→ `ASSETS.md` 参照）
3. 歌詞・制作メモを差し替え
4. GitHub Pages 公開 → URL確定 → QR生成 → 封入紙反映

## 素材の置き場所

**詳細は [`ASSETS.md`](ASSETS.md) を参照。**

```text
apps/yusha-site/assets/
├─ images/   ← ジャケット・封入紙・背景テクスチャ
├─ video/    ← yusha-loop.mp4（トップ背景）
├─ audio/    ← 試聴用プレビューMP3 × 8曲
└─ qr/       ← 生成QRの保管（任意）
```

フル音源ZIP → **外部ストレージ**（Drive/Dropbox）。URLは `download.html` に設定。

## ローカル確認

```powershell
cd e:\somosomo\apps\yusha-site
python -m http.server 8080
```

ブラウザ: `http://localhost:8080`  
（HTMLを直接開く `file://` では歌詞ページが動きません）

## GitHub Pages で公開する

**公開URL（確定後）:** https://BST1120.github.io/yusha-site/

**手順書:** [`docs/github-pages-guide.md`](docs/github-pages-guide.md)  
**Cursor 連携:** `site.config.json` + `scripts/publish.ps1`（Somosomo 全体の設定は `secretary/memory/github-pages-profile.md`）

## 登録済みアセット

| ファイル | 用途 |
|----------|------|
| `assets/images/yusha_cover_front.png` | ジャケット表 |
| `assets/images/yusha_cover_back.png` | ジャケット裏 |
| `assets/images/creative_image_seisakufuukei.png` | 制作風景 |
| `assets/images/yusha_sticker_design.png` | 封入ステッカー |
| `assets/text/lyrics/*.txt` | 全曲歌詞（編集で反映） |
| `assets/text/production/*.txt` | 曲ごと制作記録（編集で反映） |
| `assets/text/remaster-note.txt` | リマスターノート |

テキストの置き方: [`assets/text/README.md`](assets/text/README.md)

未登録（後から追加）: 背景動画 / DL用URL（config.js）

## 関連ファイル

- `PROJECT.md` — プロジェクト定義（アルバム情報・世界観・MVP）
- `docs/web-requirements.md` — Web要件詳細
- `docs/github-pages-guide.md` — 公開手順
- `ASSETS.md` — 素材配置ガイド
- `data/tracks.json` — 曲メタデータ（歌詞・メモは後から追記）
- `js/config.js` — ダウンロードURL設定

## ステータス

- [x] プロジェクト定義・要件引き継ぎ
- [x] フォルダ構成・tracks.json
- [x] HTML/CSS MVP 実装（5ページ + 共通ナビ）
- [x] 登録済み画像アセット反映
- [ ] 試聴MP3・背景動画の追加
- [ ] 歌詞・制作メモの差し替え
- [ ] GitHub Pages 公開・QR確定

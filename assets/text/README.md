# テキストアセット（歌詞・制作記録）

このフォルダに `.txt` を置くと、サイトが自動で読み込んで表示します。  
**UTF-8** で保存してください。

## フォルダ構成

```text
assets/text/
├─ remaster-note.txt          ← Archive「Remaster Note」
├─ epilogue/                  ← ★ Web 公開する制作叙述（4項目）
├─ lyrics/                    ← 全曲歌詞
└─ production/                ← 曲別（Web では未使用・執筆退避用）
```

## Archive の構成（2026-06 確定）

| 表示 | 内容 |
|------|------|
| **年表** | 曲名・制作年月 |
| **エピローグ** | 4項目。楽曲の連関・編集意図・制作叙述 |

曲ごとの制作記録ページは**ありません**。

## エピローグ

| ファイル | 項目 | URL |
|----------|------|-----|
| `01-sound-production.txt` | 音源制作 | `archive-track.html?slug=ep-sound` |
| `02-physical-production.txt` | フィジカル製作 | `archive-track.html?slug=ep-physical` |
| `03-ideation.txt` | 発想 | `archive-track.html?slug=ep-ideation` |
| `04-shipping.txt` | 発送 | `archive-track.html?slug=ep-shipping` |

執筆ワークスペース: `workspace/epilogue/`（`sync-output.ps1` で反映）

## 歌詞

`assets/text/lyrics/{番号}-{slug}.txt` → `lyrics-track.html?slug=...`

## 曲別ラフ（非公開）

`workspace/tracks/{曲}/draft/` — Web には載らない。素材はエピローグへ統合。

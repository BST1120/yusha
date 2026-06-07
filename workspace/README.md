# 制作記録ワークスペース

Cursor 上で**壁打ち → 整理 → 公開**するための作業場です。

## Web に載せるもの（重要）

| 場所 | 公開 |
|------|------|
| **Archive 年表** | 曲名・制作年月のみ（個別ページなし） |
| **エピローグ 4項目** | 個別ページあり。楽曲の連関・編集意図・制作叙述はここ |
| **`workspace/tracks/`** | **非公開**（執筆用ラフ置き場。sync しない） |

曲ごとの Web 用制作記録ページは**作らない**方針（2026-06 確定）。

---

## 2層の意味

| フォルダ | 役割 | ルール |
|----------|------|--------|
| **`draft/`** | ラフ・ブレスト・アイデアの蓄積 | **削除しない。追記のみ。** 飛び飛びのメモOK |
| **`output/`** | 精査済みの最新版（公開候補） | テンプレに沿って文体統一。ここが「つくっよし」 |

```text
workspace/
├─ manifest.json          ← 全項目の一覧（曲8 + エピローグ4）
├─ STATUS.md              ← 進捗ダッシュボード
├─ _templates/            ← 執筆テンプレート
├─ design-brief.md        ← 将来のビジュアル設計メモ
├─ tracks/                ← 曲ごと
│  └─ 02-2f/
│     ├─ draft/
│     │  ├─ _log.md        ← 日付付きで追記していくログ
│     │  └─ themes.md      ← テーマがまとまってきたら整理
│     └─ output/
│        └─ latest.txt     ← 推敲版（tracks は非公開 / epilogue のみ sync）
└─ epilogue/              ← エピローグ4項目も同じ構造
```

---

## 文体モジュール（ライナーボイス）

制作記録の**書き口**は `_modules/liner-voice/` で管理。

- 調査用プロンプト: `_modules/liner-voice/00-context-and-prompts.md`
- 組み合わせ方: `_modules/liner-voice/composer.md`
- inner image 比較稿: `_modules/liner-voice/examples/inner-image-module-draft.txt`

---

## 日常の流れ

### 1. アイデアを投げる（いつでも）

`workspace/tracks/{曲}/draft/_log.md` に追記。  
Cursor チャットで「2F の制作記録、アイデアとして〇〇を draft に追記して」と依頼してもOK。

### 2. テーマが見えてきたら

`draft/themes.md` に「確定に近いテーマ」「まだ散らばっているメモ」を整理。

### 3. 文章として整える

`_templates/production-output.template.txt` を参照し、  
`output/latest.txt` を Cursor と一緒に執筆・推敲。

### 4. Web に反映する

```powershell
cd e:\somosomo\apps\yusha-site
.\workspace\scripts\sync-output.ps1
.\scripts\publish.ps1 -Message "update production notes"
```

`sync-output.ps1` が `output/latest.txt` → `assets/text/epilogue/` へコピーします（**エピローグのみ**）。

---

## 各曲の場所

| 曲 | draft | output |
|----|-------|--------|
| inner image | `tracks/01-inner-image/draft/` | `tracks/01-inner-image/output/` |
| 2F | `tracks/02-2f/draft/` | `tracks/02-2f/output/` |
| sappo | `tracks/03-sappo/draft/` | `tracks/03-sappo/output/` |
| 遊者 | `tracks/04-yusha/draft/` | `tracks/04-yusha/output/` |
| rooftop | `tracks/05-rooftop/draft/` | `tracks/05-rooftop/output/` |
| 俺の部屋 | `tracks/06-orenoheya/draft/` | `tracks/06-orenoheya/output/` |
| tower | `tracks/07-tower/draft/` | `tracks/07-tower/output/` |
| Liquid | `tracks/08-liquid/draft/` | `tracks/08-liquid/output/` |

エピローグは `workspace/epilogue/ep-sound/` など（4項目）。

---

## Cursor への依頼例

- 「`04-yusha` の draft/_log に、今日思ったことを追記して」
- 「`02-2f` の themes を整理して、output/latest のたたき台を書いて」
- 「全曲の output をテンプレの文体に揃えて」
- 「sync して公開して」

---

## 将来のビジュアル

歌詞・制作記録ページにキャラクターイラスト・背景・ジャケット連動を載せる設計は  
`design-brief.md` にメモしていく。画像は整い次第 `assets/images/tracks/` / `assets/images/production/` へ。

---

## 注意

- 公開されるのは **`assets/text/epilogue/*.txt` のみ**（sync 後）
- **`draft/` は Web に載らない**
- 歌詞の執筆は引き続き `assets/text/lyrics/`（同様の workspace を後から追加可能）

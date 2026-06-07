# Composer — モジュールの組み合わせ方

制作記録1本 = **Form × Stance × Opening × Context-types**（各1つ以上）

---

## 手順

### 1. Form（全体の型）を選ぶ

| モジュール | 向いている記事 |
|------------|----------------|
| `forms/process-log.md` | **制作工程メモ**（今回の inner image に最適） |
| `forms/soft-impression.md` | 感想ふわっと、詩少なめ |
| `forms/anecdote-led.md` | エピソード1つから入る |
| `forms/gear-sheet.md` | 機材・プラグイン一覧中心 |
| `forms/poetic-fragment.md` | 短い断片、余白多め（曲によって） |

**『遊者』Archive デフォルト:** `process-log` + 必要なら `anecdote` を1段落

### 2. Stance（口調・距離）を選ぶ

| モジュール | 特徴 |
|------------|------|
| `stances/jjj-studio.md` | 制作具体、FL/サンプル、完成時の一言 |
| `stances/popeye-soft.md` | やわらか、日常、編集された話し言葉 |
| `stances/nori-rap.md` | ノリ、自白、「ほんまに」系 |
| `stances/note-self-liner.md` | note セルフライナー、素直、制作順 |
| `stances/yusha-archive.md` | **本サイト用** — モノクロ資料室、短句、説教なし |

**推奨ブレンド:** `yusha-archive` + `jjj-studio`（工程）+ `popeye-soft`（書き出しだけ）

### 3. Opening（書き出し）を選ぶ

| モジュール | 1文目の型 |
|------------|-----------|
| `openings/01-cold-open-fact.md` | 事実・動作から |
| `openings/02-place-time.md` | 場所・時期から |
| `openings/03-one-line-confession.md` | 短い自白 |
| `openings/04-gear-first.md` | 機材・ツール名から |

### 4. Context-types（載せる情報）を選ぶ

複数可。`context-types/` 参照。

- `workflow` — 順番（プロンプト → Suno → Cubase…）
- `gear` — DAW, VST
- `constraint` — 縛り（曲げない、新素材探さない）
- `anecdote` — サイコロ、完成時
- `naming` — 後付けタイトル
- `ai-policy` — AI への距離（短く）

---

## 『遊者』曲別の初期設定（提案）

**Web 公開はエピローグのみ。** 曲別 `tracks/` はラフ置き場。

| 執筆テーマ | Form | 公開先 |
|------------|------|--------|
| 音源・編集・曲間連関 | process-log | ep-sound |
| フィジカル | process-log | ep-physical |
| 発想・300枚 | anecdote-led | ep-ideation |
| 発送 | process-log | ep-shipping |

inner image 等の曲別ラフ → **ep-sound** に統合してから output。

---

## Cursor 依頼テンプレ

```text
{曲名} の draft/_log を、liner-voice composer で output/latest.txt に。

Form: process-log
Stance: yusha-archive + jjj-studio
Opening: cold-open-fact
Context: workflow, gear, constraint, ai-policy（短め）, naming

01-anti-patterns を守ること。
```

---

## 公開前チェック

- [ ] 「考えている」「だろうか」がない
- [ ] 固有名詞が1段落に1つ以上
- [ ] 800字前後（長いなら分割検討）
- [ ] 見出し【】なし（Web はプレーンテキスト表示）

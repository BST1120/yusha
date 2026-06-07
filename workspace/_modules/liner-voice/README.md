# ライナーボイス・モジュール（制作記録用）

『遊者』Archive の制作記録を、**ライナーノーツ／制作メモ調**で書くための部品庫。

## 何が問題だったか

第1〜2稿の inner image は、

- 【当時の意図】【このアルバムでの位置づけ】が連続
- 「〜と考えている」「〜ではないかと」が多い
- 設計論が**説明・弁明**に寄っている

→ **書き手が読者に「どう思う？」と問いかける臭い**（エッセイ調・評論調）

## 目指す方向

| 避ける | 目指す |
|--------|--------|
| 意図の説教 | **工程・事実・エピソード**（役に立つ情報） |
| 抽象の連打 | **固有名詞・手順・数字** |
| 「〜ではないだろうか」 | 話したように、またはメモのように |
| 章立てで論を展開 | 短い段落、箇条書き混ぜOK |

参照テイスト（ユーザー指定）: 日本語ラップ／インディー系、POPEYE 的な柔らかさとユーモア、JJJ 的な制作の具体さ。

## フォルダ構成

```text
_modules/liner-voice/
├─ README.md                 ← このファイル
├─ 00-context-and-prompts.md ← ★ AI調査用プロンプト集
├─ 01-anti-patterns.md       ← 書き手臭いNGと直し方
├─ composer.md               ← ★ モジュールを組み合わせて執筆
├─ stances/                  ← スタンス（誰の口調に近いか）
├─ openings/                 ← 書き出し
├─ forms/                    ← 発信形式（全体の型）
├─ context-types/            ← 載せる情報の種類
├─ vocabulary/               ← 語彙・距離感
└─ references/               ← 参照アーティスト・媒体カード
```

## 使い方（Cursor）

1. ラフ → `workspace/tracks/{曲}/draft/_log.md` に追記
2. `composer.md` で **form + stance + opening + context-types** を選ぶ
3. Cursor に「`liner-voice` モジュールで `02-2f` の output を書いて」
4. `sync-output.ps1` → 公開

## inner image の再執筆

`examples/inner-image-module-draft.txt` に、同じ内容をモジュール適用版のたたき台を置いた（比較用）。

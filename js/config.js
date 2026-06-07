/**
 * サイト設定 — ダウンロードURLはここを編集
 * Google Drive / Dropbox / YouTube の共有リンクを各項目の url に設定
 */
window.YUSHA_CONFIG = {
  siteName: "遊者",
  downloads: [
    {
      id: "wav",
      label: "WAV音源データ",
      description: "全曲のWAV音源",
      url: "",
    },
    {
      id: "lyrics",
      label: "歌詞データ",
      description: "全曲の歌詞テキスト",
      url: "",
    },
    {
      id: "jacket",
      label: "ジャケット画像",
      description: "表・裏ジャケット",
      url: "",
    },
    {
      id: "youtube",
      label: "楽曲再生用",
      description: "Youtube page",
      url: "",
      logo: "assets/images/yusha_youtube_logo.png",
      caution:
        "URLを共有すると誰でも聴けます。\n恋人以外に共有しないでください。",
    },
  ],
};

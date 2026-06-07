/**
 * サイト設定 — ダウンロードURLはここを編集
 * Dropbox フォルダ共有リンクを各項目の url に設定
 */
window.YUSHA_CONFIG = {
  siteName: "遊者",
  downloads: [
    {
      id: "wav",
      label: "WAV音源データ",
      description: "全曲のWAV音源",
      url: "https://www.dropbox.com/scl/fo/hxf668i45tcpjxk8dnkr6/ACnN6cClOh4CZ-_rNbC5ZJo?rlkey=3ut829090thycnmzuihasoomh&st=fumhws38&dl=0",
    },
    {
      id: "lyrics",
      label: "歌詞データ",
      description: "全曲の歌詞テキスト",
      url: "https://www.dropbox.com/scl/fo/vv2m0t7141tlnne4pjga8/AB3y2tdMQliri9Br5KdLU6E?rlkey=0wc7xdd7flf3a3q9cebolsg93&st=gdgifzbu&dl=0",
    },
    {
      id: "jacket",
      label: "ジャケット画像",
      description: "表・裏ジャケット",
      url: "https://www.dropbox.com/scl/fo/2ash32bh38ng3jyekfu23/AJAyJXyBiNQIoY0pzbRjn08?rlkey=192ljvm878utn9r14gsaxin0m&st=sumonljp&dl=0",
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

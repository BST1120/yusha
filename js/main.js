(function () {
  "use strict";

  const ASSETS = {
    coverFront: "assets/images/yusha_cover_front.png",
    coverBack: "assets/images/yusha_cover_back.png",
    production: "assets/images/creative_image_seisakufuukei.png",
    sticker: "assets/images/yusha_sticker_design.png",
    bgVideo: "assets/video/yusha-loop.mp4",
  };

  const TEXT = {
    remasterNote: "assets/text/remaster-note.txt",
  };

  const NAV_ITEMS = [
    { href: "index.html", label: "Home", page: "home" },
    { href: "lyrics.html", label: "Lyrics", page: "lyrics" },
    { href: "archive.html", label: "Archive", page: "archive" },
    { href: "download.html", label: "Download", page: "download" },
  ];

  function getCurrentPage() {
    const file = window.location.pathname.split("/").pop() || "index.html";
    if (file === "" || file === "index.html") return "home";
    if (file === "lyrics-track.html") return "lyrics";
    if (file === "archive-track.html") return "archive";
    return file.replace(".html", "");
  }

  function getQuerySlug() {
    return new URLSearchParams(window.location.search).get("slug") || "";
  }

  function findTrackBySlug(data, slug) {
    if (!slug) return null;
    return data.tracks.find(function (track) {
      return track.slug === slug;
    }) || null;
  }

  function findEpilogueEntry(data, slug) {
    var section = data.epilogueSection;
    if (!section || !section.entries || !slug) return null;
    return (
      section.entries.find(function (entry) {
        return entry.slug === slug;
      }) || null
    );
  }

  function epilogueImageCandidates(entry) {
    var name = entry.textFile
      ? entry.textFile.split("/").pop().replace(/\.txt$/, "")
      : entry.slug;
    var base = "assets/images/production/epilogue/" + name;
    return [base + ".jpg", base + ".png", base + ".webp"];
  }

  function trackPageUrl(slug) {
    return "lyrics-track.html?slug=" + encodeURIComponent(slug);
  }

  function archiveTrackPageUrl(slug) {
    return "archive-track.html?slug=" + encodeURIComponent(slug);
  }

  function getArchiveContext(data, slug) {
    var epilogueEntry = findEpilogueEntry(data, slug);
    if (epilogueEntry) {
      var epilogueSection = data.epilogueSection;
      return {
        isEpilogue: true,
        number: epilogueEntry.number || "",
        slug: epilogueEntry.slug,
        title: epilogueEntry.titleEn,
        subtitle: epilogueEntry.titleJa || "",
        produced: "",
        sectionLabel: epilogueSection.label || "Epilogue",
        textPaths: [epilogueEntry.textFile],
        imagePaths: epilogueImageCandidates(epilogueEntry),
        epilogueEntry: epilogueEntry,
      };
    }

    var track = findTrackBySlug(data, slug);
    if (!track) return null;

    return {
      isEpilogue: false,
      number: track.number,
      slug: track.slug,
      title: track.title,
      subtitle: "",
      produced: track.produced,
      sectionLabel: "Production Notes",
      textPaths: textPathCandidates(track, "production"),
      imagePaths: productionImageCandidates(track),
      track: track,
    };
  }

  function productionImageCandidates(track) {
    var base =
      "assets/images/production/" + track.number + "-" + track.slug;
    return [base + ".jpg", base + ".png", base + ".webp"];
  }

  function loadImageFromCandidates(paths, figure, img, altText) {
    if (!figure || !img) return Promise.resolve(false);
    var index = 0;

    function tryNext() {
      if (index >= paths.length) {
        figure.hidden = true;
        img.removeAttribute("src");
        return Promise.resolve(false);
      }
      var path = paths[index++];
      return new Promise(function (resolve) {
        img.onload = function () {
          figure.hidden = false;
          img.alt = altText;
          resolve(true);
        };
        img.onerror = function () {
          img.removeAttribute("src");
          tryNext().then(resolve);
        };
        img.src = path;
      });
    }

    return tryNext();
  }

  function trackImageCandidates(track) {
    var base = "assets/images/tracks/" + track.number + "-" + track.slug;
    return [base + ".jpg", base + ".png", base + ".webp"];
  }

  function loadTrackImage(track) {
    var figure = document.getElementById("track-visual");
    var img = document.getElementById("track-image");
    if (!figure || !img) return Promise.resolve(false);

    var paths = trackImageCandidates(track);
    var index = 0;

    function tryNext() {
      if (index >= paths.length) {
        figure.hidden = true;
        img.removeAttribute("src");
        return Promise.resolve(false);
      }
      var path = paths[index++];
      return new Promise(function (resolve) {
        img.onload = function () {
          figure.hidden = false;
          img.alt = track.title + " — visual";
          resolve(true);
        };
        img.onerror = function () {
          img.removeAttribute("src");
          tryNext().then(resolve);
        };
        img.src = path;
      });
    }

    return tryNext();
  }

  function openTrackReveal() {
    var page = document.getElementById("track-page");
    var reveal = document.getElementById("track-reveal");
    if (!page) return;

    window.requestAnimationFrame(function () {
      page.classList.add("is-opening");
      window.setTimeout(function () {
        page.classList.add("is-open");
        if (reveal) reveal.setAttribute("aria-hidden", "false");
      }, 160);
    });
  }

  function injectHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const current = getCurrentPage();
    const navLinks = NAV_ITEMS.map(function (item) {
      const active = item.page === current ? " is-active" : "";
      return '<a href="' + item.href + '" class="' + active.trim() + '">' + item.label + "</a>";
    }).join("");

    header.innerHTML =
      '<div class="inner">' +
      '<a href="index.html" class="site-logo">遊者</a>' +
      '<nav class="site-nav" aria-label="メインナビゲーション">' +
      navLinks +
      "</nav>" +
      "</div>";
  }

  function injectFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    footer.innerHTML = "<p>Web Archive — 『遊者』</p>";
  }

  function setupHomeBackground() {
    const videoWrap = document.getElementById("bg-video-wrap");
    const fallback = document.getElementById("bg-fallback");
    if (!videoWrap && !fallback) return;

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (fallback) {
      fallback.src = ASSETS.coverFront;
      fallback.alt = "";
    }

    if (!videoWrap || prefersReducedMotion || isMobile) return;

    var video = document.createElement("video");
    video.className = "bg-video";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("aria-hidden", "true");

    var source = document.createElement("source");
    source.src = ASSETS.bgVideo;
    source.type = "video/mp4";
    video.appendChild(source);

    video.addEventListener("error", function () {
      video.remove();
    });

    videoWrap.appendChild(video);
  }

  function setupHomeCover() {
    var cover = document.getElementById("home-cover");
    if (cover) {
      cover.src = ASSETS.coverFront;
      cover.alt = "遊者 — ジャケット表";
    }
  }

  function setupArchiveImages() {
    var map = {
      "img-cover-front": { src: ASSETS.coverFront, alt: "ジャケット表" },
      "img-cover-back": { src: ASSETS.coverBack, alt: "ジャケット裏" },
      "img-production": { src: ASSETS.production, alt: "制作風景" },
      "img-sticker": { src: ASSETS.sticker, alt: "封入ステッカーデザイン" },
    };

    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.src = map[id].src;
        el.alt = map[id].alt;
      }
    });
  }

  function fetchTracks() {
    return fetch("data/tracks.json")
      .then(function (res) {
        if (!res.ok) throw new Error("tracks.json not found");
        return res.json();
      });
  }

  function fetchText(path) {
    return fetch(encodeURI(path), { cache: "no-store" }).then(function (res) {
      if (!res.ok) return null;
      return res.text();
    });
  }

  function textPathCandidates(track, kind) {
    var dir = kind === "lyrics" ? "assets/text/lyrics/" : "assets/text/production/";
    var titleShort = track.title.replace(/\s*\([^)]*\)\s*/g, "").trim();
    var titleFirst = track.title.split(/\s+/)[0];
    var paths = [
      dir + track.number + "-" + track.slug + ".txt",
      dir + "{" + track.number + "}-{" + titleShort + "}.txt",
    ];
    if (titleFirst && titleFirst !== titleShort) {
      paths.push(dir + "{" + track.number + "}-{" + titleFirst + "}.txt");
    }
    return paths;
  }

  function fetchTextFromCandidates(paths) {
    var index = 0;
    function next() {
      if (index >= paths.length) return Promise.resolve(null);
      var path = paths[index++];
      return fetchText(path).then(function (text) {
        if (text && text.trim()) return text;
        return next();
      });
    }
    return next();
  }

  function trackTypeLabel(track) {
    if (track.type === "intro") return "instrumental / intro";
    if (track.type === "outro") return "instrumental / outro";
    if (track.type === "bonus") return "bonus track";
    return "";
  }

  function defaultLyricsFallback(track) {
    if (!track.hasLyrics) {
      if (track.type === "intro") return "instrumental / intro";
      if (track.type === "outro") return "instrumental / outro";
      return "instrumental";
    }
    return "（歌詞テキストを assets/text/lyrics/ に追加してください）";
  }

  function defaultProductionFallback() {
    return "（制作記録を assets/text/production/ に追加してください）";
  }

  function defaultEpilogueFallback(entry) {
    if (!entry || !entry.textFile) {
      return "（エピローグを assets/text/epilogue/ に追加してください）";
    }
    return "（" + entry.textFile + " にエピローグを記入してください）";
  }

  function renderLyricsIndex(data) {
    var container = document.getElementById("lyrics-list");
    if (!container) return;

    container.innerHTML = data.tracks
      .map(function (track) {
        return (
          '<a href="' +
          trackPageUrl(track.slug) +
          '" class="lyrics-index-item">' +
          '<span class="track-num">' +
          track.number +
          "</span>" +
          '<span class="track-title">' +
          escapeHtml(track.title) +
          "</span>" +
          '<span class="chevron" aria-hidden="true">›</span>' +
          "</a>"
        );
      })
      .join("");
  }

  function renderLyricsTrack(data) {
    var slug = getQuerySlug();
    var track = findTrackBySlug(data, slug);
    var page = document.getElementById("track-page");

    if (!track) {
      if (page) page.innerHTML = '<p class="loading">曲が見つかりません。<a href="lyrics.html">一覧へ戻る</a></p>';
      return;
    }

    document.title = track.title + " — Lyrics — 遊者";

    var numEl = document.getElementById("track-num");
    var titleEl = document.getElementById("track-title");
    var producedEl = document.getElementById("track-produced");
    var typeEl = document.getElementById("track-type-label");
    var lyricsEl = document.getElementById("track-lyrics");

    if (numEl) numEl.textContent = track.number;
    if (titleEl) titleEl.textContent = track.title;
    if (producedEl) producedEl.textContent = track.produced;

    var typeLabel = trackTypeLabel(track);
    if (typeEl) {
      if (typeLabel) {
        typeEl.textContent = typeLabel;
        typeEl.hidden = false;
      } else {
        typeEl.hidden = true;
      }
    }

    loadTrackImage(track);

    fetchTextFromCandidates(textPathCandidates(track, "lyrics")).then(function (content) {
      var body = (content && content.trim()) || defaultLyricsFallback(track);
      if (lyricsEl) {
        lyricsEl.textContent = body.trim();
        lyricsEl.classList.remove("is-loading");
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (page) page.classList.add("is-opening", "is-open");
        var reveal = document.getElementById("track-reveal");
        if (reveal) reveal.setAttribute("aria-hidden", "false");
      } else {
        openTrackReveal();
      }
    });
  }

  function renderTimelineIndex(data) {
    var container = document.getElementById("timeline");
    if (!container) return;

    container.innerHTML = data.tracks
      .map(function (track) {
        return (
          '<li class="timeline-item">' +
          '<a href="' +
          archiveTrackPageUrl(track.slug) +
          '" class="timeline-index-item">' +
          '<span class="num">' +
          track.number +
          "</span>" +
          '<span class="timeline-main">' +
          '<span class="title">' +
          escapeHtml(track.title) +
          "</span>" +
          '<span class="date">' +
          track.produced +
          "</span>" +
          "</span>" +
          '<span class="chevron" aria-hidden="true">›</span>' +
          "</a></li>"
        );
      })
      .join("");

    var epilogueEl = document.getElementById("timeline-epilogue");
    if (epilogueEl && data.epilogueSection && data.epilogueSection.entries) {
      var section = data.epilogueSection;
      var entriesHtml = section.entries
        .map(function (entry) {
          return (
            '<li class="timeline-item">' +
            '<a href="' +
            archiveTrackPageUrl(entry.slug) +
            '" class="timeline-index-item">' +
            '<span class="num">' +
            escapeHtml(entry.number || "—") +
            "</span>" +
            '<span class="timeline-main">' +
            '<span class="title">' +
            escapeHtml(entry.titleEn) +
            "</span>" +
            (entry.titleJa
              ? '<span class="date">' + escapeHtml(entry.titleJa) + "</span>"
              : "") +
            "</span>" +
            '<span class="chevron" aria-hidden="true">›</span>' +
            "</a></li>"
          );
        })
        .join("");

      epilogueEl.innerHTML =
        '<section class="epilogue-section">' +
        '<header class="epilogue-section-header">' +
        '<p class="epilogue-section-label">' +
        escapeHtml(section.label || "Epilogue") +
        "</p>" +
        '<h3 class="epilogue-section-title">' +
        escapeHtml(section.titleEn) +
        "</h3>" +
        (section.titleJa
          ? '<p class="epilogue-section-subtitle">' +
            escapeHtml(section.titleJa) +
            "</p>"
          : "") +
        "</header>" +
        '<ol class="timeline timeline-interactive epilogue-entries">' +
        entriesHtml +
        "</ol>" +
        "</section>";
    }
  }

  function renderArchiveTrack(data) {
    var slug = getQuerySlug();
    var ctx = getArchiveContext(data, slug);
    var page = document.getElementById("track-page");

    if (!ctx) {
      if (page) {
        page.innerHTML =
          '<p class="loading">制作記録が見つかりません。<a href="archive.html">Archive へ戻る</a></p>';
      }
      return;
    }

    document.title = ctx.title + " — Archive — 遊者";

    var numEl = document.getElementById("track-num");
    var titleEl = document.getElementById("track-title");
    var subtitleEl = document.getElementById("track-subtitle");
    var producedEl = document.getElementById("track-produced");
    var labelEl = document.getElementById("content-label");
    var bodyEl = document.getElementById("track-body");

    if (numEl) numEl.textContent = ctx.isEpilogue ? "—" : ctx.number;
    if (titleEl) titleEl.textContent = ctx.title;

    if (subtitleEl) {
      if (ctx.subtitle) {
        subtitleEl.textContent = ctx.subtitle;
        subtitleEl.hidden = false;
      } else {
        subtitleEl.hidden = true;
      }
    }

    if (producedEl) {
      if (ctx.produced) {
        producedEl.textContent = ctx.produced;
        producedEl.hidden = false;
      } else {
        producedEl.hidden = true;
      }
    }

    if (labelEl) labelEl.textContent = ctx.sectionLabel;

    loadImageFromCandidates(
      ctx.imagePaths,
      document.getElementById("track-visual"),
      document.getElementById("track-image"),
      ctx.title + " — production"
    );

    fetchTextFromPaths(ctx.textPaths).then(function (content) {
      var body =
        (content && content.trim()) ||
        (ctx.isEpilogue
          ? defaultEpilogueFallback(ctx.epilogueEntry)
          : defaultProductionFallback());
      if (bodyEl) {
        bodyEl.textContent = body.trim();
        bodyEl.classList.remove("is-loading");
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (page) page.classList.add("is-opening", "is-open");
        var reveal = document.getElementById("track-reveal");
        if (reveal) reveal.setAttribute("aria-hidden", "false");
      } else {
        openTrackReveal();
      }
    });
  }

  function fetchTextFromPaths(paths) {
    var index = 0;
    function next() {
      if (index >= paths.length) return Promise.resolve(null);
      var path = paths[index++];
      return fetchText(path).then(function (text) {
        if (text && text.trim()) return text;
        return next();
      });
    }
    return next();
  }

  function renderRemasterNote(data) {
    var el = document.getElementById("remaster-note");
    if (!el) return;

    fetchText(TEXT.remasterNote).then(function (content) {
      if (content && content.trim()) {
        el.textContent = content.trim();
      } else if (data.remasterNote) {
        el.textContent = data.remasterNote.short;
      }
    });
  }

  function setupDownload() {
    var container = document.getElementById("download-links");
    var notice = document.getElementById("download-notice");
    if (!container) return;

    var config = window.YUSHA_CONFIG || {};
    var items = config.downloads || [];
    var readyCount = 0;

    if (items.length === 0) {
      container.innerHTML =
        '<li class="download-link-item is-unavailable"><span class="download-link-body"><span class="download-link-label">—</span><span class="download-link-desc">js/config.js を読み込めませんでした</span></span></li>';
      if (notice) {
        notice.textContent =
          "設定ファイルが見つかりません。js/config.js が同じフォルダ構成で配置されているか確認してください。";
      }
      return;
    }

    container.innerHTML = items
      .map(function (item) {
        var url = (item.url || "").trim();
        var isReady = url.length > 0;
        if (isReady) readyCount += 1;

        var cautionHtml = item.caution
          ? '<p class="download-caution">' + escapeHtml(item.caution) + "</p>"
          : "";

        var logoHtml =
          item.id === "youtube" && item.logo
            ? '<div class="download-youtube-logo">' +
              '<img src="' +
              escapeHtml(item.logo) +
              '" alt="Youtube — 遊者">' +
              "</div>"
            : "";

        var itemClass =
          "download-link-item" + (item.id === "youtube" ? " download-link-item--youtube" : "");

        if (isReady) {
          return (
            '<li class="' +
            itemClass +
            '">' +
            logoHtml +
            '<a class="download-link" href="' +
            escapeHtml(url) +
            '" target="_blank" rel="noopener noreferrer">' +
            '<span class="download-link-label">' +
            escapeHtml(item.label) +
            "</span>" +
            '<span class="download-link-desc">' +
            escapeHtml(item.description || "") +
            "</span>" +
            '<span class="download-link-arrow" aria-hidden="true">' +
            (item.id === "youtube" ? "▶" : "↓") +
            "</span>" +
            "</a>" +
            cautionHtml +
            "</li>"
          );
        }

        return (
          '<li class="' +
          itemClass +
          ' is-unavailable">' +
          logoHtml +
          '<span class="download-link-body">' +
          '<span class="download-link-label">' +
          escapeHtml(item.label) +
          "</span>" +
          '<span class="download-link-desc">' +
          escapeHtml(item.description || "") +
          " — 準備中" +
          "</span>" +
          "</span>" +
          cautionHtml +
          "</li>"
        );
      })
      .join("");

    if (!notice) return;

    if (readyCount === items.length) {
      notice.textContent = "外部ストレージからダウンロードが始まります。";
    } else if (readyCount > 0) {
      notice.textContent =
        readyCount +
        " / " +
        items.length +
        " 件のリンクが設定済みです。未設定の項目は js/config.js にURLを追加してください。";
    } else {
      notice.textContent =
        "リンクは準備中です。公開後、管理者が各項目のURLを設定します。";
    }
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function init() {
    injectHeader();
    injectFooter();
    setupHomeBackground();
    setupHomeCover();
    setupArchiveImages();
    setupDownload();

    var page = getCurrentPage();
    var pageFile = window.location.pathname.split("/").pop() || "index.html";

    if (page === "lyrics" || page === "archive") {
      fetchTracks()
        .then(function (data) {
          if (pageFile === "lyrics-track.html") {
            renderLyricsTrack(data);
          } else if (pageFile === "archive-track.html") {
            renderArchiveTrack(data);
          } else if (page === "lyrics") {
            renderLyricsIndex(data);
          }
          if (pageFile === "archive.html") {
            renderTimelineIndex(data);
            renderRemasterNote(data);
          }
        })
        .catch(function () {
          var targets = ["lyrics-list", "timeline", "track-lyrics", "track-body"];
          targets.forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.innerHTML = '<p class="loading">データを読み込めませんでした。</p>';
          });
        });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

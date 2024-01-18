// ==UserScript==
// @name         LibReplaceX
// @namespace    https://wont.stream
// @version      0.0.1
// @description  Redirect common search engines to a LibreX instance
// @author       Unstream (wont.stream)
// @include      *
// @updateURL    https://github.com/wont-stream/libreplacex/raw/main/lrex.user.js
// @downloadURL  https://github.com/wont-stream/libreplacex/raw/main/lrex.user.js
// @homepage     https://github.com/wont-stream/libreplacex/
// @supportURL   https://github.com/wont-stream/libreplacex/issues
// @grant        none
// @run-at       document-start
// ==/UserScript==

const _o = {
  secure: true,
  librex: "librex.me",
  port: ""
}

const replaceURL = (
  secure = true,
  librex = "lx.vern.cc",
  port = "",
  searchURL
) => {
  let url = new URL(searchURL);

  let q = "";
  let type = 0;

  switch (url.host) {
    case "www.google.com":
      q = url.searchParams.get("q");

      switch (url.searchParams.get("tbm")) {
        case "isch":
          type = 1;
          break;
        case "vid":
          type = 2;
        default:
      }

      break;
    case "duckduckgo.com":
      q = url.searchParams.get("q");

      switch (url.searchParams.get("ia")) {
        case "images":
          type = 1;
          break;
        case "videos":
          type = 2;
        default:
      }

      break;
    case "www.bing.com":
      q = url.searchParams.get("q");

      switch (url.pathname.replace("/", "").replace("/search", "")) {
        case "images":
          type = 1;
          break;
        case "videos":
          type = 2;
        default:
      }

      break;
    case "search.yahoo.com":
      q = url.searchParams.get("p");
      break;
    case "images.search.yahoo.com":
      q = url.searchParams.get("p");
      type = 1;
      break;
    case "video.search.yahoo.com":
      q = url.searchParams.get("p");
      type = 2;
      break;
    case "yandex.com":
      q = url.searchParams.get("text");

      switch (url.pathname.replace("/", "").replace("/search", "")) {
        case "images":
          type = 1;
          break;
        case "video":
          type = 2;
        default:
      }

      break;
    case "www.ecosia.org":
      q = url.searchParams.get("q");

      switch (url.pathname.replace("/", "")) {
        case "images":
          type = 1;
          break;
        case "videos":
          type = 2;
        default:
      }

      break;
    default:
      return;
  }

  const newURL = new URL(`${secure ? "https" : "http"}://${librex}`);
  newURL.port = port;
  newURL.searchParams.set("q", q);
  newURL.searchParams.set("t", type);

  return newURL;
};

(() => {
    const link = replaceURL(_o.secure, _o.librex, _o.port, window.location.href);

    // If the modified URL is different from the original
    if (link.href !== window.location.href) {
        window.location = link
    }
})();



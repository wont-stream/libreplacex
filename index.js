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

// CommonJS export (Node.js)
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {a
  module.exports = replaceURL;
}

// ES6 module export (Browser)
if (typeof exports === "object" && typeof exports.default === "undefined") {
  Object.defineProperty(exports, "default", { value: replaceURL });
} else if (typeof define === "function" && define.amd) {
  // AMD module definition
  define("replaceURL", [], function () {
    return replaceURL;
  });
} else {
  // Global variable (Browser)
  window.wont_stream.replaceURL = replaceURL;
}

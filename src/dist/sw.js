if (!self.define) {
  let e,
    t = {};
  const i = (i, r) => (
    (i = new URL(i + ".js", r).href),
    t[i] ||
      new Promise((t) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = t), document.head.appendChild(e);
        } else (e = i), importScripts(i), t();
      }).then(() => {
        let e = t[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, n) => {
    const o =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (t[o]) return;
    let s = {};
    const c = (e) => i(e, o),
      d = { module: { uri: o }, exports: s, require: c };
    t[o] = Promise.all(r.map((e) => d[e] || c(e))).then((e) => (n(...e), s));
  };
}
define(["./workbox-5ffe50d4"], function (e) {
  "use strict";
  self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "index.html", revision: "a3082c139dd0af340c504cdcc2674acd" },
        { url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07" },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))
    );
});

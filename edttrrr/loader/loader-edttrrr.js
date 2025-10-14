function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    s.type = "module";
    document.body.appendChild(s);
  });
}

(async () => {
  await loadScript("/src/edttrrr/edttrrr.js");
  console.log("LOADED: edttrrr.js");
})().catch((err) => {
  console.error("Loading sequence failed:", err);
});

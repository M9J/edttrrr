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

require.config({ paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" } });

(async () => {
  await new Promise((res) => {
    require(["vs/editor/editor.main"], () => {
      console.log("READY: Monaco Editor");
      res();
    });
  });

  await loadScript("/src/edttrrr/dependencies/monaco-editor/monaco-editor-setup.js");
  console.log("LOADED: monaco-editor-setup.js");

  await loadScript("/src/edttrrr/edttrrr.js");
  console.log("LOADED: edttrrr.js");
})().catch((err) => {
  console.error("Loading sequence failed:", err);
});

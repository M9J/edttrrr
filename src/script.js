Error.stackTraceLimit = 100

// Point the loader to the Monaco files on the CDN
require.config({
  paths: {
    vs: "https://unpkg.com/monaco-editor@latest/min/vs",
    // vs: "./lib/monaco/min/vs",
  },
});

// Proxy setup for web workers
window.MonacoEnvironment = {
  getWorkerUrl: function () {
    return URL.createObjectURL(
      new Blob(
        [
          `
          self.MonacoEnvironment = { baseUrl: 'https://unpkg.com/monaco-editor@latest/min/' };
          importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
        `,
        ],
        { type: "text/javascript" }
      )
    );
  },
};

// Create the editor once Monaco is ready
require(["vs/editor/editor.main"], function () {
  window.editor = monaco.editor.create(document.getElementById("editor"), {
      value: `<style>
    body {
        margin: 0;
    }

    .container {
        display: flex;
        gap: 24px;
        background: rgba(0, 0, 255, 0.1);
        padding: 24px;
        overflow: auto;
    }

    .child {
        border: 1px solid #000;
        padding: 8px 24px;
    }

    @media screen and (max-width: 300px) {
        .child {
            background: rgba(0, 0, 0, 0.2);
        }
    }
</style>

<div class="container">
    <div class="child">C1</div>
    <div class="child">C2</div>
    <div class="child">C3</div>
    <div class="child">C4</div>
    <div class="child">C5</div>
    <div class="child">C6</div>
    <div class="child">C7</div>
    <div class="child">C8</div>
    <div class="child">C9</div>
</div>`
        .split("\n")
        .join("\n"),
    // value: ["d"].join("\n"),
    language: "html",
    theme: "vs-light",
    automaticLayout: true, // auto-resize when container size changes
    minimap: { enabled: false },
    padding: {
      top: 16, // pixels from the top
    },
    // fontFamily: "JetBrains Mono, monospace",
    // fontSize: 24,
    wordWrap: "on", // wrap by default
    wordWrapMinified: true, // also wrap very long/minified lines
    wordWrapColumn: 0, // wrap at viewport width
    wrappingIndent: "same", // how wrapped lines are indented: same / indent / deepIndent
  });

  monaco.editor.setModelLanguage(editor.getModel(), "html");

  const previewEditorContent = () => {
    const previewFrame = document.getElementById("preview");
    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    const appDiv = doc.getElementById("app");
    if (!appDiv) return;
    // appDiv.innerHTML = editor.getValue(); // Just updates the target section
    const value = editor.getValue()?.trim();
    if (value === "") {
      // previewFrame.srcdoc = `<style> body { background: #fff; user-select: none; } </style> <div style="width: max-content; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; font-family: monospace; font-size: 550%; font-weight: 900;">{&lt;&gt;&lt;/&gt;}</div>`;
      appDiv.innerHTML = `<style> body { background: transparent; user-select: none; } </style> <div style="width: max-content; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; font-family: monospace; font-size: 550%; font-weight: 900;">{&lt;&gt;&lt;/&gt;}</div>`;
    } else {
      // previewFrame.srcdoc = editor.getValue();
      appDiv.innerHTML = value; // Just updates the target section
    }
    previewFrame.onload = () => {};
  };

  //   previewFrame.srcdoc = editor.getValue();
  previewEditorContent();
  let rafId;
  editor.onDidChangeModelContent(() => {
    // Call your smooth update logic here
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => previewEditorContent());
  });

  // Shift+Alt+F (Windows/Linux) or Shift+Option+F (macOS)
  editor.addAction({
    id: "format-doc",
    label: "Format Document",
    keybindings: [monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF],
    run: (ed) => ed.getAction("editor.action.formatDocument").run(),
  });

  editor.addAction({
    id: "format-on-save",
    label: "Format on Save",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS], // Cmd+S (mac) / Ctrl+S (win/linux)
    run: (ed) => ed.getAction("editor.action.formatDocument").run(),
  });

  document.fonts.ready.then(() => editor.layout());
});

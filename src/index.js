document.body.style.visibility = "hidden";

// Configure AMD loader to use local Monaco
require.config({ paths: { vs: "./vs" } });

// Configure web worker loading
window.MonacoEnvironment = {
  getWorkerUrl: function () {
    return URL.createObjectURL(
      new Blob(
        [
          `
          self.MonacoEnvironment = { baseUrl: './vs/' };
          importScripts('./vs/base/worker/workerMain.js');
          `,
        ],
        { type: "text/javascript" }
      )
    );
  },
};

// Load Monaco and initialize editor
require(["vs/editor/editor.main"], async function () {
  // Ensure MonacoEditorEx is available globally
  if (typeof MonacoEditorEx !== "undefined") {
    MonacoEditorEx.useMonacoEx(monaco); // Enable enhanced features
  } else {
    console.error("MonacoEditorEx is not loaded. Check your path or script tag.");
  }

  const editor = monaco.editor.create(document.getElementById("editor"), {
    value: ``,
    // value: DUMMY_CODE,
    language: "css",
    theme: "vs-dark", // 'vs' | 'vs-dark' | 'hc-black'
    fontFamily: "monospace",
    automaticLayout: true, // auto-resize when container size changes
    minimap: { enabled: false },
    padding: {
      top: 16, // pixels from the top
    },
    wordWrap: "on", // wrap by default
    wordWrapMinified: true, // also wrap very long/minified lines
    wordWrapColumn: 0, // wrap at viewport width
    wrappingIndent: "same", // how wrapped lines are indented: same / indent / deepIndent
  });

  monaco.editor.defineTheme("material-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "676E95", fontStyle: "italic" },
      { token: "keyword", foreground: "C792EA" },
      { token: "number", foreground: "F78C6C" },
      { token: "string", foreground: "ECC48D" },
      { token: "operator", foreground: "89DDFF" },
      { token: "variable", foreground: "C3CCDC" },
      { token: "type", foreground: "FFCB6B" },
      { token: "function", foreground: "82AAFF" },
      { token: "constant", foreground: "FF5370" },
      { token: "class", foreground: "DECB6B" },
      { token: "tag", foreground: "FF5370" },
      { token: "attribute.name", foreground: "C792EA" },
      { token: "attribute.value", foreground: "ECC48D" },
      { token: "delimiter", foreground: "89DDFF" },
      { token: "invalid", foreground: "F07178", fontStyle: "underline" },
    ],
    colors: {
      "editor.background": "#252529",
      "editor.foreground": "#C3CCDC",
      "editorCursor.foreground": "#FFCC00",
      "editor.lineHighlightBackground": "#2b2b2f",
      "editorLineNumber.foreground": "#3C4353",
      "editorLineNumber.activeForeground": "#C3CCDC",
      "editor.selectionBackground": "#3E4451",
      "editor.inactiveSelectionBackground": "#2C3143",
      "editorIndentGuide.background": "#3C4353",
      "editorIndentGuide.activeBackground": "#5C6370",
      "editor.findMatchBackground": "#42557B",
      "editor.findMatchHighlightBackground": "#314365",
      "editor.wordHighlightBackground": "#3A3F58",
      "editor.wordHighlightStrongBackground": "#4B5263",
      "editorBracketMatch.background": "#3B3F51",
      "editorBracketMatch.border": "#FFFFFF",
      "editorGutter.background": "#252529",
      "editorOverviewRuler.border": "#00000000",
      "editorHoverWidget.background": "#2A2E3E",
      "editorHoverWidget.border": "#3C4353",
      "editorSuggestWidget.background": "#2A2E3E",
      "editorSuggestWidget.border": "#3C4353",
    },
  });

  monaco.editor.setTheme("material-dark");

  monaco.editor.setModelLanguage(editor.getModel(), "html");

  const previewEditorContent = () => {
    const previewFrame = document.getElementById("preview");
    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    const appDiv = doc.getElementById("app");
    // const appDiv = doc.querySelector("body");
    if (!appDiv) return;
    const value = editor.getValue()?.trim();
    if (value === "") {
      appDiv.style.boxSizing = "border-box";
      appDiv.innerHTML = `<style> body { background: #3b3b3f; user-select: none; overflow: hidden; border: 1px solid transparent; } </style> <div style="width: max-content; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; font-family: monospace; font-size: 525%; font-weight: 900;">{&lt;/&gt;}</div>`;
    } else {
      // appDiv.innerHTML = value; // Just updates the target section
      // appDiv.style.position = "relative";
      // appDiv.style.overflow = "auto";
      memoizedRecursiveDiff(appDiv, value);
    }
    previewFrame.onload = () => {};
  };

  window.__previewEditorContent = () => previewEditorContent();

  let rafId;
  editor.onDidChangeModelContent(() => {
    // Call your smooth update logic here
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => previewEditorContent());
  });

  editor.executeEdits("init-noop", [
    {
      range: editor.getModel().getFullModelRange(),
      text: editor.getValue(), // same text -> no visible change
      forceMoveMarkers: true,
    },
  ]);

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

  editor.addAction({
    id: "join-lines",
    label: "Join Lines",
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ],
    run: (ed) => ed.getAction("editor.action.joinLines").run(),
  });

  // Restore state after reload
  window.addEventListener("load", () => {
    const savedContent = localStorage.getItem("editorState");
    if (savedContent) {
      editor.setValue(savedContent);
    }
  });

  // Save state before reload
  window.addEventListener("beforeunload", () => {
    const editorContent = editor.getValue(); // example: Monaco Editor content
    localStorage.setItem("editorState", editorContent);
  });

  document.fonts.ready.then(async () => {
    editor.layout();
    await loadEdttrrr();
  });
});

async function loadEdttrrr() {
  try {
    await loadScript("./edttrrr/edttrrr.js");

    if (typeof window.__previewEditorContent == "function") {
      setTimeout(() => {
        window.__previewEditorContent();
      }, 250);
    }
    document.body.style.visibility = "visible";
    console.log("Happy Learning :)");
  } catch (err) {
    console.error("Loading sequence failed:", err);
  }
}

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

const DUMMY_CODE = `
  <style>
	body {
		margin: 0;
	}

	.container {
		display: flex;
		gap: 24px;
		background: rgba(0, 0, 255, 0.1);
		padding: 24px;
		overflow: auto;
		flex-direction: column;
	}

	.child {
		border: 1px solid #000;
		padding: 8px 24px;
	}

	.focus {
		background: rgba(0, 0, 255, 0.2);
	}

	@media screen and (max-width: 300px) {
		.child {
			background: rgba(0, 0, 0, 0.2);
		}
	}
</style>
<div class="container">
	<div class="child">C2</div>
	<div class="child">C3</div>
	<div class="child">C4</div>
	<div class="child focus">C1</div>
	<div class="child">C5</div>
	<div class="child">C6</div>
	<div class="child">C7</div>
	<div class="child">C8</div>
	<div class="child">C9</div>
</div>
  `
  .split("\n")
  .join("\n");

/**
 * memoizedRecursiveDiff(targetElement, newHTML)
 * - Minimal, recursive DOM diff that updates only changed nodes
 * - Memoizes last HTML per target using a WeakMap
 * - Records and restores scroll positions for all scrollable elements within target (including children)
 * - Uses requestAnimationFrame to restore after layout settles
 *
 * Usage:
 *   const app = previewFrame.contentDocument.getElementById("app");
 *   memoizedRecursiveDiff(app, latestHTML);
 */
function memoizedRecursiveDiff(target, newHTML) {
  memoizedRecursiveDiff.cache = memoizedRecursiveDiff.cache || new WeakMap();
  const lastHTML = memoizedRecursiveDiff.cache.get(target);
  if (lastHTML === newHTML) return;

  // --- Helper: capture scrollable elements and their positions (recursive) ---
  function isScrollable(el) {
    if (!el || el.nodeType !== 1) return false;
    const style = el.ownerDocument.defaultView.getComputedStyle(el);
    return (
      (style.overflowY && (style.overflowY === "auto" || style.overflowY === "scroll")) ||
      (style.overflowX && (style.overflowX === "auto" || style.overflowX === "scroll"))
    );
  }

  function captureScrollPositions(root) {
    const map = new Map();
    const walker = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    let node = root;
    while (node) {
      if (isScrollable(node)) {
        map.set(node, { top: node.scrollTop, left: node.scrollLeft });
      }
      node = walker.nextNode();
    }
    return map;
  }

  // --- Helper: create a lightweight virtual node tree from an element -->
  function toVNode(node) {
    if (node.nodeType === 3) return { type: "text", text: node.textContent };
    if (node.nodeType !== 1) return null;
    const attrs = {};
    for (let i = 0; i < node.attributes.length; i++) {
      const a = node.attributes[i];
      attrs[a.name] = a.value;
    }
    const children = Array.from(node.childNodes).map(toVNode).filter(Boolean);
    return { type: "el", tag: node.tagName.toLowerCase(), attrs, children };
  }

  // --- Parse newHTML into a fragment and vnodes ---
  const temp = document.createElement("div");
  temp.innerHTML = newHTML;
  const newVNodeList = Array.from(temp.childNodes).map(toVNode);

  // --- Take snapshot of scrollable positions (before DOM mutation) ---
  const scrollMap = captureScrollPositions(target);

  // --- Core diff: reconcile lists of child nodes at a given parent ---
  function reconcileChildren(parent, newVNodes) {
    const oldChildren = Array.from(parent.childNodes);
    const max = Math.max(oldChildren.length, newVNodes.length);

    for (let i = 0; i < max; i++) {
      const oldNode = oldChildren[i];
      const newVNode = newVNodes[i];

      // remove excess old nodes
      if (!newVNode && oldNode) {
        parent.removeChild(oldNode);
        continue;
      }

      // append new nodes if old missing
      if (newVNode && !oldNode) {
        parent.appendChild(createDomFromVNode(newVNode, parent.ownerDocument));
        continue;
      }

      // both exist -> diff
      if (newVNode && oldNode) {
        if (newVNode.type === "text" && oldNode.nodeType === 3) {
          if (oldNode.textContent !== newVNode.text) oldNode.textContent = newVNode.text;
        } else if (newVNode.type === "text" && oldNode.nodeType !== 3) {
          parent.replaceChild(parent.ownerDocument.createTextNode(newVNode.text), oldNode);
        } else if (oldNode.nodeType === 1) {
          // element vs element: compare tag
          if (oldNode.tagName.toLowerCase() !== newVNode.tag) {
            parent.replaceChild(createDomFromVNode(newVNode, parent.ownerDocument), oldNode);
          } else {
            // update attributes (simple strategy: remove absent, set changed)
            updateAttributes(oldNode, newVNode.attrs);
            // recurse into children
            reconcileChildren(oldNode, newVNode.children);
          }
        } else {
          // fallback replace
          parent.replaceChild(createDomFromVNode(newVNode, parent.ownerDocument), oldNode);
        }
      }
    }
  }

  // --- Create DOM node from vnode ---
  function createDomFromVNode(vn, doc) {
    if (vn.type === "text") return doc.createTextNode(vn.text);
    const el = doc.createElement(vn.tag);
    for (const k in vn.attrs) el.setAttribute(k, vn.attrs[k]);
    for (const c of vn.children) el.appendChild(createDomFromVNode(c, doc));
    return el;
  }

  // --- Update attributes minimal ---
  function updateAttributes(el, newAttrs) {
    // remove old attrs that are not present
    const toRemove = [];
    for (let i = 0; i < el.attributes.length; i++) {
      const a = el.attributes[i];
      if (!(a.name in newAttrs)) toRemove.push(a.name);
    }
    toRemove.forEach((n) => el.removeAttribute(n));
    // set new / changed attrs
    for (const k in newAttrs) {
      if (el.getAttribute(k) !== newAttrs[k]) el.setAttribute(k, newAttrs[k]);
    }
  }

  // --- Run reconciliation on target's children ---
  reconcileChildren(target, newVNodeList);

  // --- Restore scroll positions after layout settles ---
  requestAnimationFrame(() => {
    // small double RAF to be safer if images/fonts cause reflow
    requestAnimationFrame(() => {
      for (const [node, pos] of scrollMap.entries()) {
        // If node still in DOM, restore
        if (node.isConnected) {
          node.scrollTop = pos.top;
          node.scrollLeft = pos.left;
        }
      }
    });
  });

  // --- Update cache ---
  memoizedRecursiveDiff.cache.set(target, newHTML);
}

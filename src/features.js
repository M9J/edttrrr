window.EDTTRRR = {};

document.addEventListener("DOMContentLoaded", () => {
  const previewFrame = document.getElementById("preview");
  previewFrame.srcdoc = `<html><body><div id='app'></div></body></html>`;

  initResizePreviewListener();
});

function initResizePreviewListener() {
  const target = document.getElementById("preview");
  const output = document.getElementById("dimensions");

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      output.innerHTML = `${Math.round(width)} &times; ${Math.round(height)} pixels`;
    }
  });

  resizeObserver.observe(target);
}

let isMaxScreenPreview = false;
window.EDTTRRR.toggleMaxScreenPreview = (el) => {
  const rightPane = document.getElementById("right-pane");
  if (isMaxScreenPreview) {
    rightPane.classList.remove("display-none");
    el.textContent = "Maximize";
    el.classList.remove("toolbar-is-active-item");
    isMaxScreenPreview = false;
  } else {
    rightPane.classList.add("display-none");
    el.textContent = "Restore";
    el.classList.add("toolbar-is-active-item");
    isMaxScreenPreview = true;
  }
};

let isMaxScreenEditor = false;
window.EDTTRRR.toggleMaxScreenEditor = (el) => {
  const leftPane = document.getElementById("left-pane");
  if (isMaxScreenEditor) {
    leftPane.classList.remove("display-none");
    el.textContent = "Maximize";
    el.classList.remove("toolbar-is-active-item");
    isMaxScreenEditor = false;
  } else {
    leftPane.classList.add("display-none");
    el.textContent = "Restore";
    el.classList.add("toolbar-is-active-item");
    isMaxScreenEditor = true;
  }
};

function updateZoomDisplay() {
  const zoom = Math.round(window.devicePixelRatio * 100);
  document.getElementById("zoomLevel").textContent = `${zoom}%`;
}
updateZoomDisplay();
window.addEventListener("resize", updateZoomDisplay);

let isPreviewPinned = false;
window.EDTTRRR.togglePin = (el) => {
  const previewWrapper = document.getElementById("preview-wrapper");
  if (isPreviewPinned) {
    previewWrapper.classList.remove("center-content");
    el.textContent = "Unpin";
    isPreviewPinned = false;
  } else {
    previewWrapper.classList.add("center-content");
    el.textContent = "Pin";
    isPreviewPinned = true;
  }
};

let currentEditorTab = "source";
window.EDTTRRR.viewTab = (tab = "source") => {
  currentEditorTab = tab;
  const sourcePanel = document.getElementById("editor-wrapper");
  const elementsPanel = document.getElementById("elements-wrapper");
  const stylesPanel = document.getElementById("styles-wrapper");
  const variablesPanel = document.getElementById("variables-wrapper");
  sourcePanel.classList.add("display-none");
  elementsPanel.classList.add("display-none");
  stylesPanel.classList.add("display-none");
  variablesPanel.classList.add("display-none");
  if (tab === "source") {
    sourcePanel.classList.remove("display-none");
  } else if (tab === "elements") {
    elementsPanel.classList.remove("display-none");
  } else if (tab === "styles") {
    stylesPanel.classList.remove("display-none");
  } else if (tab === "variables") {
    variablesPanel.classList.remove("display-none");
  }
  const sourceTabButton = document.getElementById("app-toolbar-button-tab-source");
  const elementsTabButton = document.getElementById("app-toolbar-button-tab-elements");
  const stylesTabButton = document.getElementById("app-toolbar-button-tab-styles");
  const variablesTabButton = document.getElementById("app-toolbar-button-tab-variables");
  sourceTabButton.classList.remove("toolbar-is-active-item");
  elementsTabButton.classList.remove("toolbar-is-active-item");
  stylesTabButton.classList.remove("toolbar-is-active-item");
  variablesTabButton.classList.remove("toolbar-is-active-item");
  if (tab === "source") {
    sourceTabButton.classList.add("toolbar-is-active-item");
  } else if (tab === "elements") {
    elementsTabButton.classList.add("toolbar-is-active-item");
  } else if (tab === "styles") {
    stylesTabButton.classList.add("toolbar-is-active-item");
  } else if (tab === "variables") {
    variablesTabButton.classList.add("toolbar-is-active-item");
  }
};

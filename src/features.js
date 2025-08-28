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
      const preview = document.getElementById("preview");
      preview.style.width = width + "px";
      preview.style.height = height + "px";
    }
  });

  resizeObserver.observe(target);
}

let isMaxScreenPreview = false;
window.EDTTRRR.toggleMaxScreenPreview = (el) => {
  const rightPane = document.getElementById("right-pane");
  if (isMaxScreenPreview) {
    rightPane.classList.remove("display-none");
    el.textContent = "Maximize Preview";
    isMaxScreenPreview = false;
  } else {
    rightPane.classList.add("display-none");
    el.textContent = "Restore Preview";
    isMaxScreenPreview = true;
  }
};

let isMaxScreenEditor = false;
window.EDTTRRR.toggleMaxScreenEditor = (el) => {
  const leftPane = document.getElementById("left-pane");
  if (isMaxScreenEditor) {
    leftPane.classList.remove("display-none");
    el.textContent = "Maximize Editor";
    isMaxScreenEditor = false;
  } else {
    leftPane.classList.add("display-none");
    el.textContent = "Restore Editor";
    isMaxScreenEditor = true;
  }
};

function updateZoomDisplay() {
  const zoom = Math.round(window.devicePixelRatio * 100);
  document.getElementById("zoomLevelPreview").textContent = `${zoom}%`;
  document.getElementById("zoomLevelEditor").textContent = `${zoom}%`;
}

updateZoomDisplay();

// Optional: update on resize or interval
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

const rightPane = document.getElementById("right-pane");
const previewWrapper = document.getElementById("preview-wrapper");

export function initResizePreviewListener() {
  const target = document.getElementById("preview");
  const output = document.getElementById("dimensions");

  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      const pxlDimensions = `${Math.round(width)} &times; ${Math.round(height)} pixels`;
      output.innerHTML = `${pxlDimensions}`;
    }
  });

  resizeObserver.observe(target);
}

export function toggleMaxScreenPreview(isMaxScreenPreview) {
  const el = document.getElementById("toolbar-button-max-screen-preview");
  const img = el.querySelector(".app-toolbar-icon-image");
  if (isMaxScreenPreview) {
    rightPane.classList.remove("display-none");
    el.classList.remove("toolbar-is-active-item");
    img.src = img.dataset.activeSrc;
    isMaxScreenPreview = false;
  } else {
    rightPane.classList.add("display-none");
    el.classList.add("toolbar-is-active-item");
    img.src = img.dataset.inactiveSrc;
    isMaxScreenPreview = true;
  }
  return isMaxScreenPreview;
}

export function togglePin(isPreviewPinned) {
  const el = document.getElementById("toolbar-button-pin");
  const img = el.querySelector(".app-toolbar-icon-image");
  if (isPreviewPinned) {
    previewWrapper.classList.add("center-content");
    img.src = img.dataset.inactiveSrc;
    isPreviewPinned = false;
  } else {
    previewWrapper.classList.remove("center-content");
    img.src = img.dataset.activeSrc;
    isPreviewPinned = true;
  }
  return isPreviewPinned;
}

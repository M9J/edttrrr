import { getFromLocalStorage } from "../../utils/localStorage.js";

const container = document.getElementById("container");
const appToolbars = document.querySelectorAll(".app-toolbar");
const appPreview = document.querySelector(".preview");
const appEditor = document.querySelector(".editor");

export function updateBrowserZoomDisplay() {
  const browserZoom = Math.round(window.devicePixelRatio * 100);
  document.getElementById("browserZoomLevel").textContent = `${browserZoom}%`;
}

export function updateAppZoomDisplay() {
  const parsedUrl = new URL(location.href);
  const params = new URLSearchParams(parsedUrl.search);
  const appZoomLevel = params.get("zoom");
  const isAllowedZoomLevel = parseFloat(appZoomLevel) >= 1.0 && parseFloat(appZoomLevel) <= 2.0;
  if (isAllowedZoomLevel) {
    document.getElementById("appZoomLevel").textContent = `${appZoomLevel}x`;
    appToolbars.forEach((t) => t.classList.add("zoom-" + appZoomLevel.replace(".", "-")));
    appPreview.classList.add("zoom-" + appZoomLevel.replace(".", "-"));
    appEditor.classList.add("zoom-" + appZoomLevel.replace(".", "-"));
  }
}

export function swapPanes(isPanesSwapped) {
  if (isPanesSwapped) {
    isPanesSwapped = false;
    container.classList.remove("flex-direction-row-reverse");
  } else {
    isPanesSwapped = true;
    container.classList.add("flex-direction-row-reverse");
  }
  return isPanesSwapped;
}

export function loadApplicationConfigurationFromLocalStorage() {
  let isPanesSwapped = getFromLocalStorage("isPanesSwapped");

  if (isPanesSwapped) {
    swapPanes(!isPanesSwapped);
  }
}

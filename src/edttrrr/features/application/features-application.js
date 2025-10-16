import { getFromLocalStorage, setToLocalStorage } from "../../utils/localStorage.js";

const container = document.getElementById("container");
const appToolbars = document.querySelectorAll(".app-toolbar");
const appPreview = document.querySelector(".preview");
const appEditor = document.querySelector(".editor");

export function updateBrowserZoomDisplay() {
  const browserZoom = Math.round(window.devicePixelRatio * 100);
  document.getElementById("browserZoomLevel").textContent = `${browserZoom}%`;
}

export function updateAppZoomDisplay() {
  const params = new URLSearchParams(location.search);
  const appZoomLevel = params.get("zoom") || getFromLocalStorage("appZoomLevel");
  const isAllowedZoomLevel = parseFloat(appZoomLevel) >= 1.0 && parseFloat(appZoomLevel) <= 2.0;
  if (isAllowedZoomLevel) {
    document.getElementById("appZoomLevel").textContent = `${appZoomLevel}x`;
    const cls = "zoom-" + appZoomLevel.replace(".", "-");
    appToolbars.forEach((t) => t.classList.add(cls));
    appPreview.classList.add(cls);
    appEditor.classList.add(cls);
    setToLocalStorage("appZoomLevel", appZoomLevel);

    // If zoom was not present in the URL, or differs from stored value, update it
    if (params.get("zoom") !== appZoomLevel) {
      params.set("zoom", appZoomLevel);
      const newSearch = params.toString();
      const newUrl = location.pathname + (newSearch ? "?" + newSearch : "") + location.hash;
      history.replaceState(null, "", newUrl);
    }
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

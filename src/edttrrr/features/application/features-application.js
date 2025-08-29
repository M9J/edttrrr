import { getFromLocalStorage } from "../../utils/localStorage.js";

const container = document.getElementById("container");

export function updateBrowserZoomDisplay() {
  const browserZoom = Math.round(window.devicePixelRatio * 100);
  document.getElementById("browserZoomLevel").textContent = `${browserZoom}%`;
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

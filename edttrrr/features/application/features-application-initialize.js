import { updateBrowserZoomDisplay } from "./features-application.js";

export function initializeFeaturesApplication() {
  const previewFrame = document.getElementById("preview");
  previewFrame.srcdoc = `<html><body><div id='app'></div></body></html>`;
  updateBrowserZoomDisplay();
  window.addEventListener("resize", updateBrowserZoomDisplay);
}

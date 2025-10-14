import { getFromLocalStorage, setToLocalStorage } from "../utils/localStorage.js";
import { initializeFeaturesApplication } from "./application/features-application-initialize.js";
import {
  loadApplicationConfigurationFromLocalStorage,
  swapPanes,
} from "./application/features-application.js";
import { switchTab, toggleMaxScreenEditor } from "./editor/features-editor.js";
import { initializeFeaturesPreview } from "./preview/features-preview-initialize.js";
import { toggleMaxScreenPreview, togglePin } from "./preview/features-preview.js";

const EDTTRRR = {};

initializeFeaturesApplication();
initializeFeaturesPreview();

let isMaxScreenPreview = getFromLocalStorage("isMaxScreenPreview") || false;
let isMaxScreenEditor = getFromLocalStorage("isMaxScreenEditor") || false;
let currentEditorTab = getFromLocalStorage("currentEditorTab") || "source";
let isPreviewPinned = getFromLocalStorage("isPreviewPinned") || true;
let isPanesSwapped = getFromLocalStorage("isPanesSwapped") || false;

// console.table(localStorage);

loadApplicationConfigurationFromLocalStorage();

EDTTRRR.toggleMaxScreenPreview = () => {
  isMaxScreenPreview = toggleMaxScreenPreview(isMaxScreenPreview);
  setToLocalStorage("isMaxScreenPreview", isMaxScreenPreview);
};

EDTTRRR.toggleMaxScreenEditor = () => {
  isMaxScreenEditor = toggleMaxScreenEditor(isMaxScreenEditor);
  setToLocalStorage("isMaxScreenEditor", isMaxScreenEditor);
};

EDTTRRR.togglePin = () => {
  isPreviewPinned = togglePin(isPreviewPinned);
  setToLocalStorage("isPreviewPinned", isPreviewPinned);
};

EDTTRRR.switchTab = (tab = "source") => {
  currentEditorTab = switchTab(tab);
  setToLocalStorage("currentEditorTab", currentEditorTab);
};

EDTTRRR.swapPanes = () => {
  isPanesSwapped = swapPanes(isPanesSwapped);
  setToLocalStorage("isPanesSwapped", isPanesSwapped);
};

export default EDTTRRR;

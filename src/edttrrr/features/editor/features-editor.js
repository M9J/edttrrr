const TABS = ["source", "elements", "styles"];

const leftPane = document.getElementById("left-pane");
const resizeHandle = document.getElementById("resize-handle-horizontal");

export function toggleMaxScreenEditor(isMaxScreenEditor) {
  const el = document.getElementById("toolbar-button-max-screen-preview");
  const img = el.querySelector(".app-toolbar-icon-image");
  if (isMaxScreenEditor) {
    leftPane.classList.remove("display-none");
    resizeHandle.classList.remove("display-none");
    img.src = img.dataset.activeSrc;
    el.classList.remove("toolbar-is-active-item");
    isMaxScreenEditor = false;
  } else {
    leftPane.classList.add("display-none");
    resizeHandle.classList.add("display-none");
    img.src = img.dataset.inactiveSrc;
    el.classList.add("toolbar-is-active-item");
    isMaxScreenEditor = true;
  }
  return isMaxScreenEditor;
}

export function switchTab(tabToSwitch = "source") {
  if (!tabToSwitch) throw new Error(`'tab' not provided`);
  for (let panel in panels) panels[panel].classList.add("display-none");
  for (let tabButton in tabButtons) tabButtons[tabButton].classList.remove("toolbar-is-active-tab");
  if (panels[tabToSwitch]) panels[tabToSwitch].classList.remove("display-none");
  if (tabButtons[tabToSwitch]) tabButtons[tabToSwitch].classList.add("toolbar-is-active-tab");
  return tabToSwitch;
}

const panels = {};
const tabButtons = {};
if (!(Object.keys(panels).length > 0) || !(Object.keys(tabButtons).length > 0)) {
  for (let tab of TABS) {
    const panel = document.getElementById(tab + "-wrapper");
    panels[tab] = panel;
    const tabButton = document.getElementById("app-toolbar-button-tab-" + tab);
    tabButtons[tab] = tabButton;
  }
}

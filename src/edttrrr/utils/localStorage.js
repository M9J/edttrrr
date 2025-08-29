export function getFromLocalStorage(key) {
  if (typeof key === "undefined") throw new Error(`'key' not provided`);
  if (typeof localStorage !== "undefined") return JSON.parse(localStorage.getItem(key));
}

export function setToLocalStorage(key, value) {
  if (typeof key === "undefined") throw new Error(`'key' not provided`);
  if (typeof value === "undefined") throw new Error(`'value' not provided`);
  if (typeof localStorage !== "undefined") return localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromLocalStorage(key) {
  if (typeof key === "undefined") throw new Error(`'key' not provided`);
  if (typeof localStorage !== "undefined") return localStorage.removeItem(key);
}

export const SIL = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
export const GIL = (key) => JSON.parse(localStorage.getItem(key));
export const RIL = (key) => localStorage.removeItem(key);

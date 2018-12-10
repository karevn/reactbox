/* global location */
let hash = null;
const hasHistoryAPI = () => window.history && window.history.pushState;

const addToHistoryAPI = () =>
  window.history.pushState("", "", window.location.pathname);
const addUsingLocation = () => {
  window.location.href = window.location.href.replace(/#.*$/, "#");
};
const clearHash = () =>
  hasHistoryAPI() ? addToHistoryAPI() : addUsingLocation();

const storeHash = () => {
  hash = location.hash;
};
const setHash = value => {
  location.hash = value;
};
const justTry = callback => {
  try {
    callback();
  } catch (error) {}
};
export default {
  init() {
    if (location.hash) {
      storeHash();
    }
  },
  set(item) {
    justTry(() => setHash(item.hash ? item.hash : hash || ""));
  },
  reset() {
    justTry(() => {
      if (hash) {
        setHash(hash);
      } else {
        clearHash();
      }
    });
    storeHash(null);
  }
};

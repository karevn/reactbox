let hash = null;
export default {
  init(){
    if (location.hash) { return hash = location.hash; }
  },
  set(item){
    try {
      if (item.hash) {
        return location.hash = item.hash;
      } else {
        return location.hash = hash ? hash : '';
      }
    } catch (error) {}
  },
  reset() {
    try {
      if (hash) {
        location.hash = hash;
      } else {
        location.hash = '';
      }
    } catch (error) {}
    return hash = null;
  }
};

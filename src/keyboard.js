export default function(dispatch){
  let onKeyDown = function(e){
    if (e.which === 27) {
      dispatch('unmount');
    }
    if (e.which === 37 || e.which === 38) {
      dispatch('prev');
    }
    if (e.which === 40 || e.which === 39) {
      return dispatch('next');
    }
  };

  return {
    enable() {
      return window.addEventListener('keydown', onKeyDown);
    },
    disable() {
      return window.removeEventListener('keydown', onKeyDown);
    }
  };
};

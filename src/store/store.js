import { createStore } from "vuex";

export default createStore({
  state: {
    transition: false,
  },
  mutations: {
    updateTransition(state, payload) {
      state.transition = payload;
    },
  },
  getters: {
    transition: function (state) {
      return state.transition;
    },
  },
});

import { createStore } from 'vuex';

import coaches from './coaches/index.js';
import requests from './requests/index.js';

export default createStore({
  modules: {
    coaches,
    requests,
  },
  state() {
    return {
      userId: 'c1',
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    }
  }
});

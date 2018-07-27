import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    headNav:'headNav1'
  },
  getters: {
    headNav: state => state.headNav
  },
  mutations: {
    setHeadNav: (state,nav) => {
      state.headNav = nav;
    }
  },
  actions: {

  }
});

export default store

import Vue from 'vue';
import Vuex from 'vuex';
import stepMutations from './steps/mutations.js';

Vue.use(Vuex);
const appsteps = {
  state: {
    appId: ''
  },
  mutations: stepMutations
};

export default new Vuex.Store({
  modules: {
    appsteps
  }
});

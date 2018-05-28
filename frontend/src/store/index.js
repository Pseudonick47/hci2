import Vue from 'vue';
import Vuex from 'vuex';

import {
  auth,
  courses,
} from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    courses,
  },
};

export default new Vuex.Store(storeData);

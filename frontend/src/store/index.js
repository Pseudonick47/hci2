import Vue from 'vue';
import Vuex from 'vuex';

import {
  auth,
  courses,
  schedule,
} from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    courses,
    schedule,
  },
};

export default new Vuex.Store(storeData);

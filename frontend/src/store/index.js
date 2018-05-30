import Vue from 'vue';
import Vuex from 'vuex';

import {
  auth,
  courses,
  entity,
  alert,
} from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    courses,
    entity,
    alert,
  },
};

export default new Vuex.Store(storeData);

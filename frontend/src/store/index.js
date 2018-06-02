import Vue from 'vue';
import Vuex from 'vuex';

import {
  auth,
  courses,
  schedule,
  entity,
  alert,
} from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    courses,
    schedule,
    entity,
    alert,
  },
};

export default new Vuex.Store(storeData);

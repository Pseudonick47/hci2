import Vue from 'vue';
import Vuex from 'vuex';

import {
  auth,
  courses,
  entity,
} from './modules';

Vue.use(Vuex);

const storeData = {
  modules: {
    auth,
    courses,
    entity,
  },
};

export default new Vuex.Store(storeData);

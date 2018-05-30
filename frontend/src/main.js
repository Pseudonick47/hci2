import Vue from 'vue';
import App from './app';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import Axios from 'axios';
import 'vuetify/dist/vuetify.min.css';
import Config from './config';
import VeeValidate from 'vee-validate';
import AlertHelper from './helpers/alert-helper';
import VueShortcuts from 'vue-shortcuts';

// eslint-disable-next-line
import * as _ from 'lodash';
Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueShortcuts);
Vue.prototype.router = router;
Vue.prototype.$alert = AlertHelper;

Vue.use(VeeValidate);

Axios.defaults.baseURL = Config.getApiUrl();
Axios.defaults.headers.Accept = 'application/json';
// Axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

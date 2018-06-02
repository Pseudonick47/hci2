import { ENVIRONMENTS, BACKEND_HOSTNAMES } from '@/constants';

export default {
  getEnv() {
    return ENVIRONMENTS[window.location.hostname];
  },

  getHostName() {
    return BACKEND_HOSTNAMES[this.getEnv()];
  },

  getApiUrl() {
    return this.getHostName();
  },
};

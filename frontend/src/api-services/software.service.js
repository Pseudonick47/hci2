import Axios from 'axios';

const PREFIX = 'software/';

export default {
  create(data) {
    return Axios.post(PREFIX, data);
  },
  list() {
    return Axios.get(PREFIX);
  },
};

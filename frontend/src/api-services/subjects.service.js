import Axios from 'axios';

const PREFIX = 'subjects/';

export default {
  create(data) {
    return Axios.post(PREFIX, data);
  },
};

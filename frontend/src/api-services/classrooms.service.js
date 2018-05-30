import Axios from 'axios';

const PREFIX = 'classrooms/';

export default {
  create(data) {
    return Axios.post(PREFIX, data);
  },
};

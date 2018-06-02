import Axios from 'axios';

const PREFIX = 'courses/';

export default {
  create(data) {
    return Axios.post(PREFIX, data);
  },
  list() {
    return Axios.get(PREFIX);
  },
  delete(data) {
    return Axios.delete(`${PREFIX}${data}`);
  },
  update(id, data) {
    return Axios.patch(`${PREFIX}${id}`, data);
  },
};

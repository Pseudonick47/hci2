import Axios from 'axios';

const PREFIX = 'schedule/';

export default {
  create(data) {
    return Axios.post(PREFIX, data);
  },
  list() {
    return Axios.get(PREFIX);
  },
  get(id) {
    return Axios.get(`${PREFIX}${id}`);
  },
  delete(data) {
    return Axios.delete(`${PREFIX}${data}`);
  },
  update(id, data) {
    return Axios.patch(`${PREFIX}${id}`, data);
  },
  available() {
    return Axios.get(`${PREFIX}names`);
  },
};

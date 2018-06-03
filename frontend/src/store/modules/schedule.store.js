import { Schedule } from 'Models/schedule.model';

const namespaced = true;

const state = {
  schedules: null,
};

const getters = {
  all: (state) => state.schedules,
  titles: (state) => _.map(state.schedules, [
    'id',
    'title',
  ]),
  get: (state, id) => _.find(state.schedules, { id }),
};

const mutations = {
  set(state, schedules) {
    state.schedules = schedules;
  },
  initialize(state, props) {
    state.schedule = Schedule.initialize(props);
  },
};

export {
  namespaced,
  state,
  getters,
  mutations,
};

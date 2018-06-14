import { ScheduleModel } from 'Models/scheduling/schedule.model';

const namespaced = true;

const state = {
  schedules: null,
  active: null,
  available: [],
};

const getters = {
  all: (state) => state.schedules,
  available: (state) => state.available,
  get: (state, id) => _.find(state.schedules, { id }),
  active: (state) => state.active,
};

const mutations = {
  set(state, schedules) {
    state.schedules = _.map(schedules, (s) => new ScheduleModel(s));
  },
  setAvailable(state, available) {
    state.available = available;
  },
  setActive(state, schedule) {
    state.active = schedule;
  },
};

export {
  namespaced,
  state,
  getters,
  mutations,
};

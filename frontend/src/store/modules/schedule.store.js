import { ScheduleModel } from 'Models/schedule.model';

const namespaced = true;

const state = {
  schedule: null,
};

const getters = {
  get: (state) => state.schedule,
};

const mutations = {
  set(state, schedule) {
    state.schedule = new ScheduleModel({}, schedule);
  },
  initialize(state, props) {
    state.schedule = new ScheduleModel(props);
  },
};

export {
  namespaced,
  state,
  getters,
  mutations,
};

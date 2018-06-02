import { TableModel } from 'Models/table.model';

const namespaced = true;

const state = {
  schedule: TableModel.testModel(),
};

const getters = {
  get: (state) => state.schedule,
};

const mutations = {
  set(state, schedule) {
    state.schedule = new TableModel(schedule);
  },
};

export {
  namespaced,
  state,
  getters,
  mutations,
};

const state = {
  showAlert: false,
  alertMessage: '',
  alertColor: 'primary',
  alertIcon: '',
  showTutorialOverlay: false,
};

const getters = {
  showTutorialOverlay: (state) => state.showTutorialOverlay,
  alertIcon: (state) => state.alertIcon,
  alertColor: (state) => state.alertColor,
  alertMessage: (state) => state.alertMessage,
  showAlert: (state) => state.showAlert,
};

const mutations = {
  setTutorialOverlay(state, newState) {
    state.showTutorialOverlay = newState;
  },
  success(state, message) {
    state.alertIcon = 'check_circle';
    state.alertColor = 'grey';
    state.alertMessage = message;
    state.showAlert = true;
  },
  info(state, message) {
    state.alertIcon = 'info';
    state.alertColor = 'grey';
    state.alertMessage = message;
    state.showAlert = true;
  },
  warning(state, message) {
    state.alertIcon = 'priority_high';
    state.alertColor = 'grey';
    state.alertMessage = message;
    state.showAlert = true;
  },
  error(state, message) {
    state.alertIcon = 'warning';
    state.alertColor = 'grey';
    state.alertMessage = message;
    state.showAlert = true;
  },
  turnOff(state) {
    state.showAlert = false;
  },
};

export {
  state,
  getters,
  mutations,
};

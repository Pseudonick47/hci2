import Vue from 'vue';
import store from 'Store';

class TutorialHelper {
  constructor() {
    this.focusedElements = [];
    this.FLOW_ELEMENTS = [
      // ['arst'],
      ['button-entities'],
      ['tab-software'],
    ];
    this.currentStep = 0;
  }

  unfocusElements() {
    _.forEach(this.focusedElements, (x) => {
      x.classList.remove('tutorial-focused');
    });
    this.focusedElements = [];
  }

  focusElements(elements = []) {
    this.unfocusElements();
    this.focusedElements = _.map(elements, (e) => {
      return document.getElementById(e);
    });
    _.forEach(this.focusedElements, (x) => {
      console.log(x);
      x.classList.add('tutorial-focused');
    });
  }

  nextStep() {
    this.currentStep++;
    this.focusElements(this.FLOW_ELEMENTS[this.currentStep]);
  }

  skipTutorial() {
    this.unfocusElements();
    this.currentStep = 0;
    store.commit('setTutorialOverlay', false);
  }

  startTutorial() {
    store.commit('setTutorialOverlay', true);
    Vue.prototype.router.push({ name: 'entities' });
    this.focusElements(this.FLOW_ELEMENTS[this.currentStep]);
  }
}

const tutorialHelper = new TutorialHelper();
export default tutorialHelper;

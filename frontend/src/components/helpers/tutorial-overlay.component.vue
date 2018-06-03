<template>
  <div class="tutorial-overlay">
    <div class="button-wrapper">
      <v-btn class="overlay-button" @click="skipTutorial">Skip</v-btn>
      <v-btn class="overlay-button" @click="nextStep">Next</v-btn>
    </div>
  </div>
</template>
<script>
import TutorialHelper from './../../helpers/tutorial.helper';

export default {
  name: 'TutorialOverlay',
  methods: {
    nextStep() {
      TutorialHelper.nextStep();
    },
    skipTutorial() {
      TutorialHelper.skipTutorial();
    },
  },
};
</script>
<style>
.tutorial-overlay {
  width: 100%!important;
  height: 100%!important;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 5000;
  display: flex;
  align-items: flex-end;

}
.overlay-button {
  /* position: absolute; */
  /* bottom: 50px; */
}
.button-wrapper {
  /* display: flex; */
  bottom: 0px;
  left: 0px;
}
</style>

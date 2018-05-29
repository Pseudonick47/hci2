<template>
  <div
    class="help"
  >
    <span class="help-text">
      <v-icon>help</v-icon>
    </span>
    <help-dialog></help-dialog>
  </div>
</template>
<script>
import Vue from 'vue';
import HelpDialog from 'Components/help/help-dialog.component';

export default {
  name: 'Help',
  components: {
    HelpDialog,
  },
  computed: {
    currentRouteName() {
      return Vue.prototype.router.currentRoute.name;
    },
  },
};
</script>
<style>
.help {
  background: rgb(91, 88, 88);
  position: fixed;
  bottom: -10px;
  right:-10px;
  z-index: 5999;
  padding: 40px;
  border-radius: 1990px 0px  0px 0px ;
  transition-timing-function: ease;
  transition: bottom 0.5s, right 0.5s;
}

.help:hover {
  bottom: 0px;
  right: 0px;
}

.help-text {
  font-size: 20px;
  color: white;
  position: relative;
  right: -10px;
  bottom: -10px;
}
</style>

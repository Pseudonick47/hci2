<template>
  <div class="tutorial-overlay"></div>
</template>
<script>
export default {
  name: 'TutorialOverlay',
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
}
</style>

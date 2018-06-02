<template>
  <div id="schedule-container">
    <classes />
    <drag-and-drop-area />
  </div>
</template>
<script>
import Classes from 'Components/scheduling/classes.component';
import DragAndDropArea from 'Components/scheduling/drag-and-drop-area.component';

export default {
  name: 'Home',
  components: {
    Classes,
    DragAndDropArea,
  },
};
</script>
<style>
#schedule-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>

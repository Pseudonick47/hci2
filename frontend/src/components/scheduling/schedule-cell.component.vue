<template>
  <td
    v-if="model.visible"
    :id="`schedule-cell-${model.row}-${model.col}`"
    :rowspan="model.rowspan"
    :class="{
      'schedule__body__cell--dropzone': model.dropzone,
      'schedule__body__cell--disabled': model.disabled,
    }"
    :draggable="model.draggable"
    class="schedule__body__cell"
    @mousedown.stop="onSelect($event)"
    @dragstart="onDragstart($event)"
    @dragend="onDragend($event)"
    @dragenter="onDragenter($event)"
    @dragover="onDragover($event)"
    @dragleave="onDragleave($event)"
    @drop="onDrop($event)"
  >
    <v-card
      v-if="model.term"
      class="schedule__term__card elevation-8"
    >
      <v-container
        fluid
        style="height: 100%; padding: 0;"
      >
        <v-layout row style="height: 33.33%">
          <v-flex
            d-flex
            align-end
            justify-center
            pb-2
          >
            <div class="title schedule__term__card__text">
              {{ model.term.number }}
            </div>
          </v-flex>
        </v-layout>
        <v-layout row style="height: 33.33%">
          <v-flex
            d-flex
            align-center
            justify-center
          >
            <div class="title schedule__term__card__text">
              {{ model.term.subject.label }}
            </div>
          </v-flex>
        </v-layout>
        <v-layout row style="height: 33.33%">
          <v-flex
            d-flex
            align-start
            justify-center
            pt-2
          >
            <div class="title schedule__term__card__text">
              {{ model.term.course.label }}
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </td>
</template>
<script>
import { ScheduleCell } from 'Models/scheduling/schedule-cell.model';

export default {
  name: 'ScheduleCell',
  props: {
    model: {
      type: ScheduleCell,
      required: true,
    },
  },
  methods: {
    onSelect(event) {
      this.$emit('selected', { cell: this.model, event });
    },
    onDragstart(event) {
      this.$emit('dragstart', { cell: this.model, event });
    },
    onDragend(event) {
      this.$emit('dragend', { cell: this.model, event });
    },
    onDragenter(event) {
      this.$emit('dragenter', { cell: this.model, event });
    },
    onDragover(event) {
      this.$emit('dragover', { cell: this.model, event });
    },
    onDragleave(event) {
      this.$emit('dragleave', { cell: this.model, event });
    },
    onDrop(event) {
      this.$emit('drop', { cell: this.model, event });
    },
  },
};
</script>

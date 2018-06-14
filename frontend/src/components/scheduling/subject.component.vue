<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    id="terms-drawer"
    right
    style="overflow-y: scroll; overflow-x: hidden;"
  >
    <v-layout
      column
      align-center
    >
      <v-container
        v-if="mini"
        class="px-1 py-3 mb-2 mt-3"
      >
        <v-layout
          class="mb-4"
          justify-center
        >
          <v-list-tile-action>
            <v-btn
              icon
              @click.native.stop="mini = false"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-layout>
        <div class="title text-xs-center mb-2">{{ course.label }}</div>
        <div class="title text-xs-center mb-2">{{ subject.label }}</div>
        <div class="subheading text-xs-center mb-3">{{ unassigned }}</div>
      </v-container>
      <v-container
        v-else
        class="pl-4 pr-2 pt-4 pb-2"
      >
        <v-layout align-center>
          <v-list-tile-action>
            <v-btn
              icon
              @click.native.stop="mini = true"
            >
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-layout row wrap>
            <div class="title mb-2">{{ course.label }} {{ subject.title }}</div>
            <div class="subheading">{{ unassigned }} unassigned terms</div>
          </v-layout>
        </v-layout>
      </v-container>
      <v-divider class="mb-4"/>
      <table
        id="terms-table"
        style="overflow: scroll;"
      >
        <tbody class="terms__body">
          <tr
            v-for="(row, i) in table.cells"
            :key="`terms-body-row-${i}`"
            class="terms__body__row py-2"
          >
            <schedule-cell
              v-for="(cell, j) in row"
              :key="`terms-body-cell-${i}${j}`"
              :model="cell"
              class="terms__body__cell"
              @dragstart="onDragstart"
              @dragend="onDragend"
              @dragenter="onDragenter"
              @dragover="onDragover"
              @drop="onDrop"
            />
          </tr>
        </tbody>
      </table>
    </v-layout>
  </v-navigation-drawer>
</template>
<script>
import ScheduleCell from 'Components/scheduling/schedule-cell.component';

import { Course } from 'Models/course.model';
import { Subject } from 'Models/subject.model';
import { ScheduleModel } from 'Models/scheduling/schedule.model';

export default {
  name: 'Subject',
  components: {
    ScheduleCell,
  },
  props: {
    course: {
      type: [
        Course,
        Object,
      ],
      required: true,
    },
    subject: {
      type: [
        Subject,
        Object,
      ],
      required: true,
    },
    model: {
      type: ScheduleModel,
      required: true,
    },
    dnd: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    drawer: true,
    mini: false,
    dropPerformed: false,
    // table: null,
  }),
  computed: {
    unassigned() {
      const terms = this.model.terms[this.course.label][this.subject.label].data;
      console.log(terms);
      return _.filter(terms, (t) => t && !t.assigned).length;
    },
    origin: {
      get() {
        return this.dnd.origin;
      },
      set(val) {
        this.dnd.origin = val;
      },
    },
    dropzone: {
      get() {
        return this.dnd.dropzone;
      },
      set(val) {
        this.dnd.dropzone = val;
      },
    },
    table() {
      return this.model.terms[this.course.label][this.subject.label].table;
    },
  },
  beforeMount() {
    this.$root.$on('scheduleDrop', () => {
      this.dropPerformed = true;
      this.onDragend();
    });
    this.$root.$on('drawerDrop', () => {
      this.dropPerformed = true;
      this.onDragend();
    });
  },
  methods: {
    setDropzone(cell) {
      const { row, col } = cell;
      const { rowspan } = this.origin;

      _.each(this.table.getCells(row, col, rowspan, 1), (c) => {
        c.dropzone = true;
        this.dropzone.push(c);
      });
    },
    clearDropzone() {
      if (!this.dropzone) {
        return;
      }

      _.each(this.dropzone, (cell) => {
        cell.dropzone = false;
      });

      this.dropzone = [];
    },
    onDragstart(payload) {
      const { cell, event } = payload;
      this.origin = _.cloneDeep(cell);
      this.origin.term = cell.term;
      this.origin.affiliated = [];

      const { row, col } = cell;

      this.table.splitCells(row, col);
      cell.reset();

      event.dataTransfer.setData('text', '0');
      this.dropPerformed = false;
    },
    onDragend() {
      this.clearDropzone();

      if (!this.dropPerformed) {
        const { row, col, rowspan } = this.origin;
        this.table.cells[row].splice(col, 1, this.origin);
        this.table.mergeCells(row, col, rowspan);
      }

      this.origin = null;
    },
    onDragenter(payload) {
      const { cell } = payload;

      this.clearDropzone();

      if (!cell.changeable || cell.disabled) {
        return;
      }
      const { row, col } = cell;
      const rowspan = this.origin.rowspan;

      try {
        const cells = this.table.getCells(row, col, rowspan, 1);

        if (!_.every(cells, { 'changeable': true, 'disabled': false })) {
          return;
        }
      } catch (e) {
        return;
      }

      this.setDropzone(cell);
    },
    onDragover(payload) {
      const { event } = payload;
      if (this.origin) {
        event.preventDefault();
      }
    },
    onDrop(payload) {
      const { cell } = payload;

      if (_.isEmpty(this.dropzone)) {
        return;
      }

      this.clearDropzone();

      const { term, rowspan } = this.origin;

      term.assigned = false;
      term.row = null;
      term.col = null;

      cell.term = term;
      cell.changeable = false;
      cell.draggable = true;

      const { row, col } = cell;
      this.table.mergeCells(row, col, rowspan);

      this.dropPerformed = true;

      this.$root.$emit('termsDrop');
    },
  },
};
</script>
<style>
.terms__body__row {
  height: 30px;
  max-height: 30px;
}

.terms__body__cell {
  height: 28px;
  max-height: 28px;
  border: 0 !important;
}

#terms-drawer {
  position: fixed;
  right: 0;
  top: 60px;
  height: 100%;
}

#terms-table {
  min-width: 60px;
  max-width: 60px;
}
</style>

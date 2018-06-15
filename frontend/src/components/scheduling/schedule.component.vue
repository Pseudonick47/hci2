<template>
  <table class="schedule">
    <thead class="schedule__header">
      <tr class="schedule__header__row">
        <th
          class="schedule__header__cell"
          rowspan="2"
        >Time</th>
        <th
          class="schedule__header__cell"
          v-for="header in headers"
          :key="header"
          :colspan="subheaders.length"
        >{{ header }}</th>
      </tr>
      <tr class="schedule__header__row">
        <template v-for="i in headers.length">
          <th
            v-for="(subheader, j) in subheaders"
            :key="`schedule-subheader-${i}-${j}`"
            class="schedule__header__cell--small"
          >{{ subheader }}</th>
        </template>
      </tr>
    </thead>
    <tbody class="schedule__body">
      <tr
        class="schedule__body__row"
        v-for="(index, i) in indices"
        :key="`schedule-body-row-${i}`"
      >
        <td class="schedule__body__index">{{ index }}</td>
        <schedule-cell
          v-for="(cell, j) in model.table.cells[i]"
          :key="`schedule-body-cell${i}${j}`"
          :model="cell"
          @selected="onSelect"
          @dragstart="onDragstart"
          @dragend="onDragend"
          @dragenter="onDragenter"
          @dragover="onDragover"
          @drop="onDrop"
        />
      </tr>
    </tbody>
  </table>
</template>
<script>
import { WORK_DAYS } from '@/constants/days.constants';
import TimeHelper from '@/helpers/time.helper';

import ScheduleCell from 'Components/scheduling/schedule-cell.component';

import { ScheduleModel } from 'Models/scheduling/schedule.model';

export default {
  name: 'Schedule',
  components: {
    ScheduleCell,
  },
  props: {
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
    headers: _.values(WORK_DAYS),
    indices: TimeHelper.generateTimePoints(420, 1320, 15),
    dropPerformed: false,
  }),
  computed: {
    subheaders() {
      return _.map(this.$store.getters.classrooms, 'label');
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
  },
  beforeMount() {
    this.$root.$on('termsDrop', () => {
      this.dropPerformed = true;
      this.onDragend();
    });
    this.$root.$on('drawerDrop', () => {
      this.model.dirty = true;
      this.model.changed = true;

      this.dropPerformed = true;
      this.onDragend();
    });
  },
  methods: {
    onSelect(payload) {
      const { cell } = payload;

      if (cell === this.selected) {
        return;
      }

      if (this.selected) {
        this.selected.selected = false;
        this.selected = null;
      }

      if (!cell.draggable) {
        return;
      }

      this.$emit('selected', cell.term);
    },
    setDropzone(cell) {
      const { row, col } = cell;
      const { rowspan } = this.origin;

      _.each(this.model.table.getCells(row, col, rowspan, 1), (c) => {
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

      this.model.table.splitCells(row, col);
      cell.reset();

      event.dataTransfer.setData('text', '0');
      this.dropPerformed = false;
    },
    onDragend() {
      this.clearDropzone();

      if (!this.dropPerformed) {
        const { row, col, rowspan } = this.origin;
        this.model.table.cells[row].splice(col, 1, this.origin);
        this.model.table.mergeCells(row, col, rowspan);
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
        const cells = this.model.table.getCells(row, col, rowspan, 1);

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
      const { row, col } = cell;

      term.assigned = true;
      term.row = row;
      term.col = col;

      cell.term = term;
      cell.changeable = false;
      cell.draggable = true;

      this.model.table.mergeCells(row, col, rowspan);

      this.dropPerformed = true;

      this.model.dirty = true;
      this.model.changed = true;
      this.$root.$emit('scheduleDrop');
    },
  },
};
</script>
<style>

.schedule {
  border: 1px solid rgb(180, 180, 180);
  border-collapse: collapse;
  border-radius: 10px;
  height: 100%;
  width: 100%;
}

.schedule-row:nth-child(even) {
  background-color: rgb(248, 248, 248);
}

.schedule__header {
  cursor: move;
  background: rgb(54, 54, 54);
  color: whitesmoke;
}

.schedule__header__cell {
  height: 45px;
  font-size: 16px;
}

.schedule__header__cell--small {
  height: 35px;
}

.schedule__body__index {
  border: 1px solid rgb(180, 180, 180);
  cursor: move;
  background: rgb(218, 218, 218);
  color: rgb(61, 60, 60);
  text-align: center;
  font-weight: bold;
}

.schedule__body__cell {
  height: 28px;
  max-height: 28px;
  border-bottom: 1px solid rgb(180, 180, 180);
  border-collapse: collapse;
}

.schedule__body__cell--disabled {
  background-color: #838383 !important;
}

.schedule__body__cell--dropzone {
  height: 2rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  border: 0 !important;
}

.schedule__body__index, .schedule__body__cell {
  min-width: 50px;
}

.schedule__term__card {
  height: 100% !important;
  width: 100% !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  /* background-color: #a6abaf !important; */
  background-color: #444647 !important;

  cursor: -webkit-grab;
}

.schedule__term__card__text {
  transform: rotate(-90deg);
  color: whitesmoke;
  flex: none !important;
}

</style>

<template>
  <vue-draggable-resizable
    :drag-handle="'#drag-anchor'"
    :minw="400"
    :minh="300"
    :z="20"
    :x="320"
    :y="550"
    :resizable="false"
    id="moveable-drawer"
  >
    <v-icon id="drag-anchor">menu</v-icon>
    <table class="pa-2" id="moveable-table">
      <tbody class="moveable-table__body">
        <tr
          v-for="(row, i) in table.cells"
          :key="`moveable-table-body-row-${i}`"
          class="moveable-table__body__row py-2"
        >
          <schedule-cell
            v-for="(cell, j) in row"
            :key="`moveable-table-body-cell-${i}${j}`"
            :model="cell"
            class="moveable-table__body__cell"
            @dragstart="onDragstart"
            @dragend="onDragend"
            @dragenter="onDragenter"
            @dragover="onDragover"
            @drop="onDrop"
          />
        </tr>
      </tbody>
    </table>
  </vue-draggable-resizable>
</template>
<script>
import ScheduleCell from 'Components/scheduling/schedule-cell.component';

import { ScheduleTable } from 'Models/scheduling/schedule-table.model';

export default {
  name: 'MoveableDrawer',
  components: {
    ScheduleCell,
  },
  props: {
    dnd: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    table: new ScheduleTable(12, 12),
  }),
  computed: {
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
    this.$root.$on('scheduleDrop', () => {
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

      this.$root.$emit('drawerDrop');
    },
  },
};
</script>
<style>
.moveable-table__body__row {
  height: 10px !important;
  max-height: 10px !important;
}

.moveable-table__body__cell {
  height: 10px !important;
  max-height: 10px !important;
  width: 20px !important;
  min-width: 30px !important;
  border: 0 !important;
}

#moveable-drawer {
  position: fixed;
  top: unset;
  box-shadow: 5px 5px 3px rgb(146, 146, 146);
  background-color: rgb(233, 232, 232);
}

#moveable-table {
  height: 90%;
  width: 90%;
}

#drag-anchor {
  cursor: move;
  margin: 3px;
}
</style>

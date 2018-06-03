<template>
  <div id="drag-and-drop-area">
    <v-container id="area-container">
      <v-layout row>
        <v-flex style="min-width: 16%; max-width: 16%" />
        <v-flex
          pa-4
          style="width: auto !important;"
        >
          <table
            v-if="schedule"
            class="schedule-table"
            @dragenter="clearPreviousDropzones()"
          >
            <thead class="schedule-header-container elevation-1">
              <tr class="schedule-header-row">
                <th
                  v-if="schedule.indexHeader"
                  :colspan="schedule.indexHeader.colspan"
                  :rowspan="schedule.indexHeader.rowspan"
                  class="schedule-header body-1"
                >{{ schedule.indexHeader.text }}</th>
                <th
                  v-for="(header, i) in schedule.headers"
                  :key="`schedule-header-${i}`"
                  :colspan="header.colspan"
                  :rowspan="header.rowspan"
                  class="schedule-header title"
                >{{ header.text }}</th>
              </tr>
              <tr class="schedule-header-row">
                <template
                  v-for="(header, i) in schedule.headers"
                  v-if="header.subheaders"
                >
                  <th
                    v-for="(subheader, j) in header.subheaders"
                    :key="`schedule-subheader-${i}-${j}`"
                    :colspan="subheader.colspan"
                    class="schedule-subheader caption"
                  >{{ subheader.text }}</th>
                </template>
              </tr>
            </thead>
            <tr
              v-for="(row, i) in schedule.cells"
              :key="`schedule-row-${i}`"
              :id="`schedule-row-${i}`"
              class="schedule-row"
            >
              <th class="schedule-index caption">{{ schedule.indices[i] }}</th>
              <td
                v-for="(cell, j) in row"
                v-if="cell.visible"
                :key="`cell${i}${j}`"
                :id="`schedule-cell-${i}-${j}`"
                :colspan="cell.colspan"
                :rowspan="cell.rowspan"
                :class="{
                  'schedule-cell': cell.active,
                  'schedule-inactive-cell': !cell.active,
                  'item-dropzone-area': cell.dropzone,
                  'disabled-cell': cell.disabled,
                }"
                :aria-dropeffect="cell.dropeffect"
                :aria-grabbed="cell.grabbed"
                :draggable="cell.draggable"
                @mousedown.stop="addSelection(cell, 'schedule')"
                @dragstart="onDragstart($event, cell)"
                @dragend="onDragend()"
                @dragenter="onScheduleEnter(cell)"
                @dragover="onDragover($event)"
                @dragleave="onDragleave()"
                @drop="onScheduleDrop($event, cell)"
              >
                <v-card
                  v-if="cell.draggable"
                  class="term-card elevation-3"
                >
                  <div class="title my-vertical-text">{{ cell.course.label }} {{ cell.subject.label }}</div>
                </v-card>
              </td>
            </tr>
          </table>
        </v-flex>
        <v-flex style="min-width: 16%; max-width: 16%" />
      </v-layout>
    </v-container>
    <v-navigation-drawer
      v-if="course && subject && schedule"
      v-model="termDrawer"
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
          <template v-for="(term, i) in schedule.terms[course.id][subject.id]">
            <tr
              :key="i"
              py-2
              :id="`terms-row-${i * term.rowspan}`"
              class="terms-row"
            >
              <td
                :rowspan="term.rowspan"
                :id="`terms-cell-${i}-1`"
                :aria-dropeffect="term.dropeffect"
                :aria-grabbed="term.grabbed"
                :draggable="term.draggable"
                :class="{
                  'item-dropzone-area': term.dropzone,
                }"
                class="terms-cell"
                @mousedown.stop="addSelection(term, 'terms')"
                @dragstart="onDragstart($event, term)"
                @dragend="onDragend()"
                @dragenter="onTermsEnter(term)"
                @dragover="onDragover($event)"
                @dragleave="onDragleave()"
                @drop="onTermsDrop($event, term)"
              >
                <v-card
                  v-if="term.draggable"
                  class="term-card elevation-3"
                >
                  <div class="title my-vertical-text">{{ term.course.label }} {{ term.subject.label }}</div>
                </v-card>
              </td>
            </tr>
            <template v-if="term.rowspan > 1">
              <tr
                v-for="j in term.rowspan"
                :key="`terms-row-${i * term.rowspan + j}`"
                class="terms-row"
              />
            </template>
          </template>
        </table>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { Course } from 'Models/course.model';
import { Subject } from 'Models/subject.model';
import { Schedule } from 'Models/schedule.model';

// eslint-disable-next-line
const panzoom = require('panzoom');

export default {
  name: 'DragAndDropArea',
  props: {
    course: {
      type: Course,
      required: false,
      default: () => null,
    },
    subject: {
      type: Subject,
      required: false,
      default: () => null,
    },
    schedule: {
      type: Schedule,
      required: false,
      default: () => null,
    },
  },
  data: () => ({
    termDrawer: true,
    mini: false,
    dnd: {
      origin: null,
      target: null,
      dropzones: [],
    },
  }),
  computed: {
    unassigned() {
      return _.filter(this.schedule.terms[this.course.id][this.subject.id], { assigned: false }).length;
    },
  },
  watch: {
    schedule() {
      this.disableCells();
    },
    subject() {
      this.disableCells();
    },
  },
  mounted() {
    const area = document.getElementById('area-container');
    panzoom(area, {
      smoothScroll: false,
      beforeWheel(e) {
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },
    });
  },
  methods: {
    addSelection(cell, origin) {
      if (!cell.draggable) {
        if (this.dnd.item) {
          this.dnd.item.grabbed = false;
          this.dnd.item = null;
          this.dnd.origin = null;
        }
        return;
      }

      if (origin === 'schedule' &&
          (cell.course.id !== this.course.id ||
          cell.subject.id !== this.subject.id)) {
            this.$emit('changeSubject', {
              course: cell.course,
              subject: cell.subject,
            });
          }

      cell.grabbed = true;
      this.dnd.item = cell;
      this.dnd.origin = origin;
    },
    removeSelection() {
      if (!this.dnd.item) {
        return;
      }
      this.dnd.item.grabbed = false;
      this.dnd.item = null;
      this.dnd.origin = null;
    },
    clearPreviousDropzones() {
      _.each(this.dnd.previousDropzones, (d) => {
        if (!_.find(this.dnd.dropzones, { row: d.row, col: d.col })) {
          d.dropzone = false;
        }
      });
      this.dnd.previousDropzones = [];
    },
    clearDropzones() {
      _.each(this.dnd.dropzones, (d) => {
        d.dropzone = false;
      });
      this.dnd.dropzones = [];
    },
    onDragstart(event, cell) {
      event.dataTransfer.setData('text', '');
      this.dnd.item = cell;
      this.dnd.drop = false;
    },
    onDragend() {
      this.clearPreviousDropzones();
      this.clearDropzones();
      this.dnd.item = null;
      this.dnd.origin = null;
    },
    onScheduleEnter(cell) {
      this.dnd.previousDropzones = this.dnd.dropzones;
      this.dnd.dropzones = [];

      if (!cell.changeable || cell.disabled) {
        return;
      }

      cell.dropzone = true;
      this.dnd.dropzones.push(cell);

      let affectedCell = null;

      _.times(this.dnd.item.rowspan - 1, (i) => {
        if (this.schedule.cells.length > cell.row + i + 1) {
          affectedCell = this.schedule.cells[cell.row + i + 1][cell.col];
          affectedCell.dropzone = true;
          this.dnd.dropzones.push(affectedCell);
        }
      });
    },
    onTermsEnter(cell) {
      if (this.dnd.item === cell) {
        return;
      }

      this.dnd.previousDropzones = this.dnd.dropzones;
      this.dnd.dropzones = [];

      if (!cell.changeable) {
        return;
      }

      cell.dropzone = true;
      this.dnd.dropzones.push(cell);
    },
    onDragover(event) {
      if (this.dnd.item) {
        event.preventDefault();
      }
    },
    onDragleave() {
      if (this.dnd.previousDropzones) {
        this.clearPreviousDropzones();
      }
    },
    onScheduleDrop(event, cell) {
      if (!cell.changeable || cell.disabled) {
        return;
      }

      if (this.schedule.cells.length < cell.row + this.dnd.item.rowspan) {
        return;
      }

      try {
        let affectedCell = null;
        _.times(this.dnd.item.rowspan - 1, (i) => {
          affectedCell = this.schedule.cells[cell.row + i + 1][cell.col];
          if (!affectedCell.changeable) {
            throw new Error();
          }
          affectedCell.visible = false;
        });
      } catch (error) {
        _.times(this.dnd.item.rowspan - 1, (i) => {
          this.schedule.cells[cell.row + i + 1][cell.col].visible = true;
        });
        return;
      }

      const item = this.dnd.item;
      item.assigned = true;

      if (this.dnd.origin === 'terms') {
        this.schedule.terms[this.course.id][this.subject.id][item.row] = {
          row: item.row,
          visible: true,
          active: true,
          colspan: item.colspan,
          rowspan: item.rowspan,
          dropeffect: 'none',
          draggable: false,
          dropzone: false,
          grabbed: false,
          changeable: true,
          assigned: true,
        };

        item.row = cell.row;
        item.col = cell.col;

        this.schedule.cells[cell.row][cell.col] = item;
      } else {
        _.times(this.dnd.item.rowspan - 1, (i) => {
          this.schedule.cells[item.row + i + 1][item.col].visible = true;
        });

        const itemCopy = _.cloneDeep(item);

        item.row = cell.row;
        item.col = cell.col;

        this.schedule.cells[cell.row][cell.col] = item;

        cell.row = itemCopy.row;
        cell.col = itemCopy.col;

        this.schedule.cells[itemCopy.row][itemCopy.col] = cell;
      }


      this.dnd.item = null;
      this.dnd.origin = null;

      event.preventDefault();
    },
    onTermsDrop(event, cell) {
      if (!cell.changeable) {
        return;
      }

      const item = this.dnd.item;
      item.assigned = false;

      if (this.dnd.origin === 'terms') {
        this.schedule.terms[this.course.id][this.subject.id].splice(item.row, 1, {
          row: item.row,
          visible: true,
          active: true,
          colspan: item.colspan,
          rowspan: item.rowspan,
          dropeffect: 'none',
          draggable: false,
          dropzone: false,
          grabbed: false,
          changeable: true,
          assigned: false,
        });

        item.row = cell.row;

        this.schedule.terms[this.course.id][this.subject.id].splice(cell.row, 1, item);
      } else {
        _.times(this.dnd.item.rowspan - 1, (i) => {
          this.schedule.cells[item.row + i + 1][item.col].visible = true;
        });

        const itemCopy = _.cloneDeep(item);

        item.row = cell.row;
        item.col = null;

        this.schedule.terms[this.course.id][this.subject.id].splice(cell.row, 1, item);

        this.schedule.cells[itemCopy.row].splice(itemCopy.col, 1, {
          row: itemCopy.row,
          col: itemCopy.col,
          visible: true,
          active: true,
          colspan: 1,
          rowspan: 1,
          dropzone: false,
          changeable: true,
          dropeffect: 'none',
          draggable: false,
          grabbed: false,
        });
      }

      this.dnd.item = null;
      this.dnd.origin = null;

      event.preventDefault();
    },
    disableCells() {
      const labs = this.$store.getters.classrooms;

      const toDisable = _.filter(labs, (lab) => {
        if (this.subject.board === 'yes' && lab.board === 'no') {
          return true;
        }

        if (this.subject.smartBoard === 'yes' && lab.smartBoard === 'no') {
          return true;
        }

        if (this.subject.projector === 'yes' && lab.projector === 'no') {
          return true;
        }

        if (this.subject.groupSize > lab.capacity) {
          return true;
        }

        let ok = true;
        _.each(this.subject.os, (os) => {
          if (_.find(lab.os, (los) => los === os)) {
            ok = false;
          }
        });

        if (!ok) {
          return true;
        }

        ok = true;
        _.each(this.subject.software, (s) => {
          if (_.find(lab.software, (ls) => ls.id === s.id)) {
            ok = false;
          }
        });

        if (!ok) {
          return true;
        }

        return false;
      });

      const indecies = [];
      _.each(toDisable, (lab) => {
        _.each(this.schedule.headers, (header, i) => {
          const index = _.findIndex(header.subheaders, (s) => s.text === lab.label);
          // eslint-disable-next-line
          indecies.push(i * header.subheaders.length + index);
        });
      });

      _.each(this.schedule.cells, (row) => _.each(row, (cell) => {
        cell.disabled = false;
      }));

      _.each(this.schedule.cells, (row) => _.each(indecies, (index) => {
        row[index].disabled = true;
      }));
    },
  },
};
</script>
<style>
.item-dropzone-area {
  height: 2rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  border: 0 !important;
}

.schedule-table {
  border: 1px solid rgb(180, 180, 180);
  border-collapse: collapse;
  border-radius: 10px;
  height: 100%;
  width: 100%;
}

.schedule-cell {
  border-bottom: 1px solid rgb(180, 180, 180);
  border-collapse: collapse;
}

.schedule-header, .schedule-subheader {
  /* border: 1px solid rgb(83, 83, 83); */
  cursor: move;
}

.schedule-index {
  border: 1px solid rgb(180, 180, 180);
  cursor: move;
}

.schedule-header-container {
  background: rgb(54, 54, 54);
  color: whitesmoke;
}

.schedule-index {
  background: rgb(218, 218, 218);
  color: rgb(61, 60, 60);
}

.schedule-header {
  /* background: rgb(204, 204, 204); */
  height: 45px;
}

.schedule-subheader, .schedule-index {
  min-width: 50px;
}

.schedule-subheader{
  height: 35px;
}

.schedule-row:nth-child(even) {
  background-color: rgb(248, 248, 248);
}

.schedule-cell, .terms-cell {
  height: 28px;
  max-height: 28px;
}

.term-card {
  height: 100% !important;
  width: 100% !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background-color: #a6abaf !important;
  cursor: -webkit-grab;
}

.terms-cell {
  background-color: rgb(218, 218, 218);
}

.terms-row {
  height: 30px;
  max-height: 30px;
}

.disabled-cell {
  background-color: #838383 !important;
}

.my-vertical-text {
  transform: rotate(-90deg);
}

#terms-table {
  min-width: 60px;
  max-width: 60px;
}


#drag-and-drop-area {
  height: auto;
  width: 100%;
}

#area-container {
  height: 100%;
  padding: 0;
}

#terms-drawer {
  position: fixed;
  right: 0;
  top: 60px;
  height: 100%;
}
</style>

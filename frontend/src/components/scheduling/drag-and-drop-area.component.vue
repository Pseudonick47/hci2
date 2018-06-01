<template>
  <div id="drag-and-drop-area">
    <v-container id="area-container">
      <v-layout row>
        <v-flex
          xs10
          pa-4
        >
          <schedule :model="schedule"/>
        </v-flex>
        <v-flex xs2>
          <terms :model="terms"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import * as _ from 'lodash';

import { mapGetters } from 'vuex';

import { VueDraggableMixin } from '@/mixins/drag-and-drop.mixin';

import Schedule from 'Components/scheduling/schedule.component';
import Terms from 'Components/scheduling/terms.component';

export default {
  name: 'DragAndDropArea',
  mixins: [VueDraggableMixin],
  components: {
    Schedule,
    Terms,
  },
  data() {
    return {
      options: {
        dropzoneSelector: 'tr',
        draggableSelector: 'td',
        showDropzoneAreas: true,
        onDrop: this.onDrop,
        onDragend: this.onDragend,
      },
      terms: [
        {
          active: true,
          disabled: false,
          rowspan: 3,
          colspan: 1,
          text: 'HCI',
          movable: true,
          replaceable: false,
        },
        {
          active: true,
          disabled: false,
          rowspan: 3,
          colspan: 1,
          text: 'ISA',
          movable: true,
          replaceable: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters('schedule', {
      schedule: 'get',
    }),
  },
  mounted() {
    const area = document.getElementById('drag-and-drop-area');
    Object.assign(this.defaultOptions, this.options);
    this.registerListeners(area);
    this.initiate(area);
  },
  methods: {
    extractCellInfo(id) {
      const m = id.split('-');
      return {
        type: m[0],
        row: Number(m[2]),
        col: Number(m[3]),
      };
    },
    extractRowInfo(id) {
      const m = id.split('-');
      return {
        type: m[0],
        num: Number(m[1]),
      };
    },
    onDrop(event) {
      const newRow = this.extractRowInfo(event.droptarget.id);
      const replacedCell = this.extractCellInfo(event.replacedEl.id);

      const oldRow = this.extractRowInfo(event.owner.id);
      const movedCell = this.extractCellInfo(event.items[0].id);

      let cell = null;
      if (oldRow.type === 'schedule') {
        cell = _.cloneDeep(this.schedule.data[movedCell.row][movedCell.col]);
        this.schedule.data[movedCell.row].splice(movedCell.col, 1);

        const newCell = {
          active: true,
          disabled: false,
          colspan: 1,
          rowspan: 1,
          replaceable: true,
        };

        _.times(cell.rowspan, (i) => {
          this.schedule.data[movedCell.row + i].splice(movedCell.col, 0, newCell);
        });
      } else {
        cell = _.cloneDeep(this.terms[movedCell.row]);
        this.terms.splice(movedCell.row, 1);
        this.terms.push({
          active: true,
          disabled: false,
          colspan: 1,
          rowspan: 1,
          replaceable: true,
        });
      }

      if (newRow.type === 'schedule') {
        _.times(cell.rowspan, (i) => {
          this.schedule.data[replacedCell.row + i].splice(replacedCell.col, 1);
        });

        this.schedule.data[replacedCell.row].splice(replacedCell.col, 0, cell);

        this.options.previousTargets = [];
      }
    },
    onDragend(event) {
      const target = this.extractCellInfo(event.replacedEl.id);
      const targetCell = this.schedule.data[target.row][target.col];

      if (!targetCell.replaceable) {
        event.stop();
      }
    }
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

#drag-and-drop-area {
  height: auto;
  width: 100%;
}

#area-container {
  height: 100%;
  padding: 0;
}
</style>

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
      selection: {
        owner: null,
        item: null,
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
  // methods: {
  //   stopDragAndDrop() {
  //     throw new Error('Requested D&D stop...');
  //   },
  //   addSelection(item) {
  //     if (!this.selection.owner) {
  //       this.selection.owner = item.parentNode;
  //     }

  //     item.setAttribute('aria-grabbed', 'true');

  //     this.selection.item = item;
  //   },
  //   removeSelection() {
  //     this.selection.item.setAttribute('aria-grabbed', 'false');
  //     this.selection.item = null;
  //     this.selection.owner = null;
  //   },
  //   addDropeffects() {
  //     // apply aria-dropeffect and tabindex to all targets apart from the owner
  //     for (let len = this.targets.length, i = 0; i < len; i++) {
  //       if (this.targets[i] !== this.selections.owner &&
  //         this.targets[i].getAttribute('aria-dropeffect') === 'none') {
  //         this.targets[i].setAttribute('aria-dropeffect', 'move');
  //         this.targets[i].setAttribute('tabindex', '0');
  //       }
  //     }

  //     // remove aria-grabbed and tabindex from all items inside those containers
  //     for (let len = this.items.length, i = 0; i < len; i++) {
  //       if (this.items[i].parentNode !== this.selections.owner &&
  //         this.items[i].getAttribute('aria-grabbed')) {
  //         this.items[i].removeAttribute('aria-grabbed');
  //         this.items[i].removeAttribute('tabindex');
  //       }
  //     }
  //   },
  //   clearDropeffects() {
  //     if (this.selection.item) {
  //       // reset aria-dropeffect and remove tabindex from all targets
  //       for (let i = 0; i < this.targets.length; i++) {
  //         if (this.targets[i].getAttribute('aria-dropeffect') !== 'none') {
  //           this.targets[i].setAttribute('aria-dropeffect', 'none');
  //           this.targets[i].removeAttribute('tabindex');
  //         }
  //       }

  //       // restore aria-grabbed and tabindex to all selectable items
  //       // without changing the grabbed value of any existing selected items
  //       for (let i = 0; i < this.items.length; i++) {
  //         if (!this.items[i].getAttribute('aria-grabbed')) {
  //           this.items[i].setAttribute('aria-grabbed', 'false');
  //           this.items[i].setAttribute('tabindex', '0');
  //         } else if (this.items[i].getAttribute('aria-grabbed') === 'true') {
  //           this.items[i].setAttribute('tabindex', '0');
  //         }
  //       }
  //     }
  //   },
  //   registerListeners(el) {
  //     el.addEventListener('mousedown', (e) => {
  //       const elem = e.target.closest(this.options.draggableSelector);

  //         this.clearDropeffects();

  //       if (elem && elem.getAttribute('draggable') && elem.getAttribute('aria-grabbed') === 'false') {
  //         this.clearSelections();
  //         this.addSelection(elem);
  //       }
  //     }, false);

  //     // el.addEventListener('mouseup', (e) => {
  //     //   const elem = e.target.closest(this.defaultOptions.draggableSelector);

  //     //   if (elem && elem.getAttribute('draggable')) {
  //     //     // if the item's grabbed state is currently true
  //     //     if (elem.getAttribute('aria-grabbed') === 'true') {
  //     //       // unselect this item
  //     //       this.removeSelection(elem);

  //     //       // if that was the only selected item
  //     //       // then reset the owner container reference
  //     //       if (!this.selections.items.length) {
  //     //         this.selections.owner = null;
  //     //       }
  //     //     } else {
  //     //       // else [if the item's grabbed state is false]
  //     //       // add this additional selection
  //     //       this.addSelection(elem);
  //     //     }
  //     //   }
  //     // }, false);

  //     el.addEventListener('keydown', (e) => {
  //       // Escape is the abort keystroke (for any target element)
  //       if (e.keyCode === 27) {
  //         if (this.selection.item) {
  //           this.clearDropeffects();
  //           this.clearSelections();
  //         }
  //       }
  //     }, false);

  //     el.addEventListener('dragstart', (e) => {
  //       const elem = e.target.closest(this.defaultOptions.draggableSelector);

  //       if (elem && this.selection.owner !== elem.parentNode) {
  //         e.preventDefault();
  //         return;
  //       }

  //       // we don't need the transfer data, but we have to define something
  //       // otherwise the drop action won't work at all in firefox
  //       // most browsers support the proper mime-type syntax, eg. "text/plain"
  //       // but we have to use this incorrect syntax for the benefit of IE10+
  //       e.dataTransfer.setData('text', '');

  //       this.addDropeffects();
  //     }, false);

  //     el.addEventListener('dragenter', (e) => {
  //       this.related = e.target;
  //     }, false);

  //     // dragleave event to maintain target highlighting using that variable
  //     el.addEventListener('dragleave', () => {
  //       // get a drop target reference from the relatedTarget
  //       let droptarget = this.getContainer(this.related);

  //       // if the target is the owner then it's not a valid drop target
  //       if (droptarget === this.selections.owner) {
  //         droptarget = null;
  //       }

  //       // if the drop target is different from the last stored reference
  //       // (or we have one of those references but not the other one)
  //       if (droptarget !== this.selections.droptarget) {
  //         // if we have a saved reference, clear its existing dragover class
  //         if (this.selections.droptarget) {
  //           this.selections.droptarget.className =
  //           this.selections.droptarget.className.replace(/ dragover/g, '');
  //         }

  //         // apply the dragover class to the new drop target reference
  //         if (droptarget) {
  //           droptarget.className += ' dragover';
  //         }

  //         // then save that reference for next time
  //         this.selections.droptarget = droptarget;
  //       }
  //     }, false);

  //     el.addEventListener('dragend', (e) => {

  //       // if we have a valid drop target reference
  //       // (which implies that we have some selected items)
  //       if (this.selections.droptarget) {
  //         e.preventDefault();
  //       }

  //       // if we have any selected items
  //       if (this.selection.item) {
  //         // clear dropeffect from the target containers
  //         this.clearDropeffects();

  //         // if we have a valid drop target reference
  //         if (this.selections.droptarget) {
  //           // reset the selections array
  //           this.clearSelections();

  //           // reset the target's dragover class
  //           this.selections.droptarget.className =
  //           this.selections.droptarget.className.replace(/ dragover/g, '');

  //           // reset the target reference
  //           this.selections.droptarget = null;
  //         }
  //       }

  //       // dropzone area elements
  //       this.removeOldDropzoneAreaElements();
  //     }, false);

  //     el.addEventListener('dragover', (e) => {
  //       this.nextItemElement = e.target.closest(this.defaultOptions.draggableSelector);

  //       if (dragoverCalls % 10 !== 0 && this.nextItemElement === previousTarget ||
  //         !e.target || e.target.className === 'item-dropzone-area') {
  //           return;
  //         }

  //       dragoverCalls++;
  //       previousTarget = this.nextItemElement;

  //       this.selections.droptarget = e.target.closest(this.defaultOptions.dropzoneSelector);

  //       if (this.selections.droptarget === this.selections.owner) {
  //         return;
  //       }

  //       this.removeOldDropzoneAreaElements();

  //       if(this.nextItemElement) {
  //         this.nextItemElement.classList.add('item-dropzone-area');
  //         const info = this.nextItemElement.id.split('-');
  //         const rowSpan = this.selections.items[0].rowSpan;

  //         const row = Number(info[2]);
  //         const col = Number(info[3]);

  //         for (let i = 1; i < rowSpan; i++) {
  //           const cell = document.getElementById(`schedule-cell-${row + i}-${col}`)
  //           cell.classList.add('item-dropzone-area');
  //         }
  //       }

  //     });
  //   }
  // }
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
        _.times(cell.rowspan - 1, (i) => {
          this.schedule.data[replacedCell.row + i + 1].splice(replacedCell.col, 0, {
            active: false,
            disabled: false,
            colspan: 1,
            rowspan: 1,
            replaceable: true,
          });
        });

        this.options.previousTargets = [];
      }
    },
    onDragend(event) {
      const target = this.extractCellInfo(event.replacedEl.id);
      const targetCell = this.schedule.data[target.row][target.col];

      if (!targetCell.replaceable) {
        event.stop();
      }
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

#drag-and-drop-area {
  height: auto;
  width: 100%;
}

#area-container {
  height: 100%;
  padding: 0;
}
</style>

<template>
  <div id="schedule-container">
    <v-navigation-drawer
      v-model="classDrawer"
      :mini-variant.sync="classDrawerMini"
      id="classes-drawer"
    >
      <v-toolbar
        class="transparent"
        flat
      >
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-avatar>
              Classes
            </v-list-tile-avatar>
            <v-list-tile-content>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                icon
                @click.native.stop="classDrawerMini = !classDrawerMini"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list
        class="pt-0"
        dense
      >
        <v-divider />
        <v-list-group
          v-for="course in courses"
          :key="course.id"
        >
          <v-list-tile
            slot="activator"
          >
            <v-list-tile-action>{{ course.id }}</v-list-tile-action>
            <v-list-tile-content
              @mouseenter="displayName(course.name, $event)"
              @mouseleave="hideName"
              @click="hideName"
            >
              <v-list-tile-title>{{ clip(course.name, 24) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="clas in course.classes"
            :key="clas.id"
            class="pl-3"
            @click="classSelected(clas)"
          >
            <v-list-tile-action>{{ clas.id }}</v-list-tile-action>
            <v-list-tile-content
              @mouseenter="displayName(clas.name, $event)"
              @mouseleave="hideName"
              @click="hideName"
            >
              <v-list-tile-title>{{ clip(clas.name, 33) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-tooltip
      v-if="tooltip"
      :position-x="tooltip.x"
      :position-y="tooltip.y"
      :value="true"
      right
    >
      <span> {{ tooltip.text }} </span>
    </v-tooltip>
    <div
      class="pa-3"
      id="drag-and-drop-area"
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs9>
          <table style="width:100%;">
            <thead>
              <tr>
                <th />
                <th
                  v-for="day in days"
                  :key="day"
                  :colspan="labs.length"
                >{{ day }}</th>
              </tr>
              <tr>
                <th>Time</th>
                <template
                  v-for="day in days"
                >
                  <th
                    v-for="lab in labs"
                    :key="`${day}${lab}`"
                  > {{ lab }}</th>
                </template>
              </tr>
            </thead>
            <tr
              v-for="(t, i) in time"
              :key="t"
            >
              <td>{{ t }}</td>
              <template
                v-for="(day, j) in days"
              >
                <td
                  v-for="(lab, k) in labs"
                  :key="`${i}${j}${k}`"
                />
              </template>
            </tr>
          </table>
        </v-flex>
        <v-flex xs3>
          <table style="width:100%;">
            <tr>
              <th>Term</th>
              <th>Placeholder</th>
            </tr>
            <tr>
              <td rowspan="3"><span>HCI</span></td>
              <td>O</td>
            </tr>
            <tr>
              <td>O</td>
            </tr>
            <tr>
              <td>O</td>
            </tr>
            <tr>
              <td rowspan="3">CIF</td>
              <td>O</td>
            </tr>
            <tr>
              <td>O</td>
            </tr>
            <tr>
              <td>O</td>
            </tr>
            <tr>
              <td rowspan="3">ISA</td>
              <td>O</td>
            </tr>
            <tr>
              <td>O</td>
            </tr>
            <tr>
              <td>O</td>
            </tr>
          </table>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { VueDraggableMixin } from '@/mixins/drag-and-drop.mixin';

export default {
  name: 'Schedule',
  mixins: [VueDraggableMixin],
  data() {
    return {
      classDrawer: null,
      classDrawerMini: null,
      courseTileState: null,
      tooltip: null,
      time: null,
      labs: null,
      terms: [
        'T1',
        'T2',
      ],
      days: null,
      options: {
        dropzoneSelector: 'tr',
        draggableSelector: 'td',
        showDropzoneAreas: true,
        onDrop(event) {
          console.log(event);
          event.droptarget.attributes.rowspan = 3;
        },
      },
    };
  },
  computed: {
    ...mapGetters('courses', {
      courses: 'all',
    }),
  },
  created() {
    this.time = [
      '7:00',
      '7:15',
      '7:30',
      '7:45',
      '8:00',
      '8:15',
      '8:30',
      '8:45',
      '9:00',
    ];
    this.labs = [
      'L1',
      'L2',
      'L3',
      'L4',
      'L5',
    ];
    this.days = [
      'MON',
      'TUE',
      'WED',
      'THU',
      'FRI',
      'SAT',
    ];
  },
  mounted() {
    const area = document.getElementById('drag-and-drop-area');
    console.log(area);
    Object.assign(this.defaultOptions, this.options);
    this.registerListeners(area);
    this.initiate(area);
  },
  methods: {
    classSelected(clas) {
      console.log(clas);
    },
    clip(str, num) {
      if (str.length > num) {
        return str.substring(0, num - 3) + '...';
      }
      return str;
    },
    displayName(name, event) {
      this.activeTimeout = setTimeout(() => {
        this.tooltip = {
          x: event.x,
          y: event.y,
          text: name,
        };
      }, 1000);
    },
    hideName() {
      clearTimeout(this.activeTimeout);
      this.tooltip = null;
    },
  },
};
</script>
<style>

.list__group:after, .list__group:before {
  left: 0;
}

#schedule-container {
  position: absolute;
  top: 7px;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

#drag-and-drop-area {
  height: auto;
  width: 100%;
}

table, th, td {
  border: 1px solid black;
}

.item-dropzone-area {
    height: 2rem;
    background: #888;
    opacity: 0.8;
    animation-duration: 0.5s;
    animation-name: nodeInserted;
}

</style>


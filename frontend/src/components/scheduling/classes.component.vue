<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
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
              @click.native.stop="mini = !mini"
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
            <v-list-tile-title>{{ clip(course.name, 30) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="clas in course.classes"
          :key="clas.id"
          class="pl-3"
          @click="selected(clas)"
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
    <v-tooltip
      v-if="tooltip"
      :position-x="tooltip.x"
      :position-y="tooltip.y"
      :value="true"
      right
    >
      <span> {{ tooltip.text }} </span>
    </v-tooltip>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Classes',
  data() {
    return {
      drawer: null,
      mini: null,
      courseTileState: null,
      tooltip: null,
    };
  },
  computed: {
    ...mapGetters('courses', {
      courses: 'all',
    }),
  },
  methods: {
    selected(clas) {
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
</style>

<template>
  <v-navigation-drawer
    v-model="drawer"
    id="classes-drawer"
    left
  >
    <v-toolbar
      class="transparent"
      flat
    >
      <v-list class="pa-0">
        <v-list-tile>
          <v-list-tile-content>
            {{ schedule.name }}
          </v-list-tile-content>
          <v-list-tile-action pr-1>
            <v-btn
              icon
              small
              @click="options = !options"
            >
              <v-icon>settings</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider />
    <transition name="grow">
      <div v-show="options">
        <v-btn
          flat
          block
        >New</v-btn>
        <v-btn
          flat
          block
        >Save</v-btn>
        <v-btn
          flat
          block
        >Load</v-btn>
        <v-btn
          flat
          block
        >Auto</v-btn>
        <v-divider />
      </div>
    </transition>
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
          <div class="body-2 mr-3">{{ course.label }}</div>
          <v-list-tile-content
            @mouseenter="displayName(course.title, $event)"
            @mouseleave="hideName"
            @click="hideName"
          >
            <v-list-tile-title>{{ clip(course.title, 27) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="subject in course.subjects"
          :key="subject.id"
          class="pl-3"
          @click="selected(subject)"
        >
          <div class="body-2 mr-3">{{ subject.label }}</div>
          <v-list-tile-content
            @mouseenter="displayName(subject.title, $event)"
            @mouseleave="hideName"
            @click="hideName"
          >
            <v-list-tile-title>{{ clip(subject.title, 33) }}</v-list-tile-title>
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
      options: false,
      courseTileState: null,
      tooltip: null,
    };
  },
  computed: {
    ...mapGetters('schedule', {
      schedule: 'get',
    }),
    courses() {
      const courses = this.$store.getters.courses;
      const subjects = this.$store.getters.subjects;

      _.each(courses, (c) => {
        c.subjects = _.filter(subjects, (s) => _.find(s.course, { id: c.id }));
      });
      return courses;
    },
  },
  methods: {
    selected(subject) {
      this.$emit('selected', subject);
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

.grow-enter-active, .grow-leave-active {
  transition: opacity .7s;
}

.grow-enter, .grow-leave-to {
  opacity: 0;
}

#classes-drawer {
  position: fixed;
  left: 0;
  top: 64px;
  height: 100%;
}
</style>

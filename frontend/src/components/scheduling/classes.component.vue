<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    :class="{ 'mini-drawer': mini }"
    id="classes-drawer"
    left
  >
    <div id="classes-drawer--content">
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
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-layout>
        <div class="title pa-2" style="word-break: break-all;">{{ schedule.name }}</div>
      </v-container>
      <v-toolbar
        v-else
        flat
        class="transparent"
      >
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-content>{{ schedule.name }}</v-list-tile-content>
            <v-spacer />
            <v-list-tile-action
              style="display: flex; justify-content: center; align-items: center;"
            >
              <v-btn
                icon
                @click.native.stop="mini = true"
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider />
      <v-container pa-0>
        <v-layout
          row
          wrap
        >
          <v-btn
            flat
            block
          >New</v-btn>
          <v-btn
            flat
            block
          >Auto</v-btn>
        </v-layout>
        <v-layout row wrap>
          <v-btn
            flat
            block
          >Save</v-btn>
          <v-btn
            flat
            block
          >Load</v-btn>
        </v-layout>
      </v-container>
      <!-- <transition name="grow"> -->
        <!-- <div> -->
          <!-- <div v-show="options"> -->
          <!-- <v-btn
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
        </div> -->
      <!-- </transition> -->
      <v-toolbar
        class="transparent"
        flat
      >
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-avatar>
              Subjects
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
            @click="selected(course, subject)"
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
    </div>
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
      mini: false,
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
    selected(course, subject) {
      this.$emit('selected', { course, subject });
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

.mini-drawer {
  direction: rtl;
  width: 100px !important;
  overflow-y: auto;
  overflow-x: hidden;
}

#classes-drawer {
  position: fixed;
  left: 0;
  top: 64px;
  height: 100%;
}

#classes-drawer--content {
  direction: initial;
}

</style>

<template>
  <v-app>
    <alert-box v-if="showAlert"/>
    <v-toolbar
      id="app-toolbar"
      app
    >
      <v-toolbar-title>CS Laboratories</v-toolbar-title>
      <v-spacer/>
      <v-btn
        v-intro="'Click here to see the schedule'"
        v-intro-step="1"
        flat
        @click="goToSchedule"
      >Schedule</v-btn>
      <v-btn
        v-intro="'Click here to add new software, courses, subjects and classrooms'"
        v-intro-step="2"
        flat
        id="button-entities"
        @click="goToEntities">Entities</v-btn>
      <help-dialog style="max-width: 30px; cursor: pointer;"></help-dialog>
    </v-toolbar>
    <v-content>
      <v-container
        class="px-0 mx-0"
        pt-1
        style="min-height: 100%;"
      >
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthController from 'Controllers/auth.controller';
import HelpDialog from 'Components/help/help-dialog.component';
import AlertBox from 'Components/helpers/AlertHelper.component';
import { mapGetters } from 'vuex';

import CoursesController from 'Controllers/courses.controller';
import SubjectsController from 'Controllers/subjects.controller';
import ClassroomsController from 'Controllers/classrooms.controller';
import SoftwareController from 'Controllers/software.controller';
import ScheduleController from 'Controllers/schedule.controller';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    'alert-box': AlertBox,
    HelpDialog,
  },
  computed: {
    ...mapGetters([
      'activeUser',
      'isAdmin',
      'isLogged',
      'activeUserRole',
      'showAlert',
    ]),
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    startTutorial() {
      this.$router.push({ name: 'entities' });
      this.$nextTick(() => {
        this.$intro().start();
      });
    },
    logout() {
      AuthController.logout();
    },
    goToSchedule() {
      this.$router.push({ name: 'schedule' });
    },
    goToEntities() {
      this.$router.push({ name: 'entities' });
    },
    getData() {
      ClassroomsController.list().then(({ data }) => {
        this.$store.commit('setClassrooms', data);
      });
      CoursesController.list().then(({ data }) => {
        this.$store.commit('setCourses', data);
      });
      SubjectsController.list().then(({ data }) => {
        this.$store.commit('setSubjects', data);
      });
      SoftwareController.list().then(({ data }) => {
        this.$store.commit('setSoftwares', data);
      });
      ScheduleController.list().then(({ data }) => {
        this.$store.commit('schedule/set', data);
      });
    },
  },
};
</script>
<style>
html {
  overflow: auto;
}

.application--wrap {
  height: 100%;
  min-height: 0;
}

.content {
  height: 100%;
  padding: 0 !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  background: white;
}

#app-toolbar {
  z-index: 500;
}

.tutorial-focused {
  position: relative;
  z-index: 9999;
}

</style>

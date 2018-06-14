<template>
  <div>
    <!-- <classes
      :schedule="schedule"
      @selected="subjectSelected"
      @newSchedule="newScheduleRequested = true"
      @loadSchedule="loadScheduleRequested = true"
      @saveSchedule="saveSchedule"
    /> -->
     <classes
      :schedule="model"
      @selected="selected"
      @newSchedule="createDialog = true"
      @loadSchedule="loadDialog = true"
    />
    <new-schedule-dialog
      v-if="createDialog"
      @cancel="createDialog = false"
      @confirm="create"
    />
    <load-schedule-dialog
      v-if="loadDialog"
      @cancel="loadDialog = false"
      @confirm="load"
    />
    <div id="schedule-container">
      <v-container id="area-container">
        <v-layout row>
          <v-flex style="min-width: 16%; max-width: 16%" />
          <v-flex
            pa-4
            style="width: auto !important;"
          >
            <schedule
              v-if="model"
              :model="model"
              :dnd="dnd"
              @selected="selected"
            />
          </v-flex>
          <v-flex style="min-width: 16%; max-width: 16%" />
        </v-layout>
      </v-container>
    </div>
    <subject-drawer
      v-if="course && subject && model"
      :course="course"
      :subject="subject"
      :model="model"
      :dnd="dnd"
    />
    <moveable-drawer :dnd="dnd"/>
  </div>
</template>
<script>
import Schedule from 'Components/scheduling/schedule.component';
import Classes from 'Components/scheduling/classes.component';
import NewScheduleDialog from 'Components/scheduling/new-schedule.component';
import LoadScheduleDialog from 'Components/scheduling/load-schedule.component';
import SubjectDrawer from 'Components/scheduling/subject.component';
import MoveableDrawer from 'Components/scheduling/moveable-drawer.component';

import ScheduleController from 'Controllers/schedule.controller';

import { mapGetters } from 'vuex';

// eslint-disable-next-line
const panzoom = require('panzoom');

export default {
  name: 'Home',
  components: {
    Schedule,
    Classes,
    NewScheduleDialog,
    LoadScheduleDialog,
    SubjectDrawer,
    MoveableDrawer,
  },
  data: () => ({
    terms: null,
    subject: null,
    course: null,
    createDialog: false,
    loadDialog: false,
    dnd: { origin: null, dropzone: [] },
  }),
  computed: {
    ...mapGetters('schedule', {
      model: 'active',
    }),
  },
  mounted() {
    const area = document.getElementById('area-container');

    panzoom(area, {
      smoothScroll: false,
      maxZoom: 2,
      minZoom: 0.5,
      beforeWheel(e) {
        const shouldIgnore = !e.altKey;
        return shouldIgnore;
      },
    });

    area.parentElement.removeAttribute('tabindex');
  },
  methods: {
    selected(payload) {
      if (this.model) {
        const { course, subject } = payload;
        this.subject = subject;
        this.course = course;

        ScheduleController.clearPreviousConstraints();
        ScheduleController.enforceConstraints(subject);
      }
    },
    create(name) {
      this.createDialog = false;
      ScheduleController.create(name);
    },
    load(schedule) {
      this.loadDialog = false;
      ScheduleController.get(schedule.id);
    }
  },
};
</script>
<style>
#schedule-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>

<template>
  <div
    id="schedule-container"
  >
    <classes
      :schedule="schedule"
      @selected="subjectSelected"
      @newSchedule="newScheduleRequested = true"
      @loadSchedule="loadScheduleRequested = true"
      @saveSchedule="saveSchedule"
    />
    <drag-and-drop-area
      v-if="schedule"
      :course="course"
      :subject="subject"
      :schedule="schedule"
      @changeSubject="subjectSelected"
    />
    <new-schedule-dialog
      v-if="newScheduleRequested"
      @cancel="newScheduleRequested = false"
      @confirm="createSchedule"
    />
    <load-schedule-dialog
      v-if="loadScheduleRequested"
      @cancel="loadScheduleRequested = false"
      @confirm="loadSchedule"
    />
  </div>
</template>
<script>
import Classes from 'Components/scheduling/classes.component';
import DragAndDropArea from 'Components/scheduling/drag-and-drop-area.component';
import NewScheduleDialog from 'Components/scheduling/new-schedule.component';
import LoadScheduleDialog from 'Components/scheduling/load-schedule.component';

import ScheduleController from 'Controllers/schedule.controller';

import { Term } from 'Models/term.model';

export default {
  name: 'Home',
  components: {
    Classes,
    DragAndDropArea,
    NewScheduleDialog,
    LoadScheduleDialog,
  },
  data: () => ({
    terms: null,
    subject: null,
    course: null,
    schedule: null,
    newScheduleRequested: false,
    loadScheduleRequested: false,
  }),
  methods: {
    subjectSelected(payload) {
      const { course, subject } = payload;
      this.terms = _.map(subject.terms[course.id], (t) => {
        return !t.assinged ? new Term({ ...t, course, subject }) : null;
      });
      this.course = course;
      this.subject = subject;
    },
    createSchedule(schedule) {
      this.schedule = schedule;
      this.newScheduleRequested = false;
    },
    loadSchedule(schedule) {
      this.schedule = schedule;
      console.log(this.schedule);
      this.loadScheduleRequested = false;
    },
    saveSchedule() {
      ScheduleController.update(this.schedule.id, this.schedule).then(() => {
        this.$alert.success('Schedule successfully saved!');
      }).catch(() => {
        this.$alert.error('Save failed!');
      });
    },
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

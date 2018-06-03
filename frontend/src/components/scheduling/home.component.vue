<template>
  <div
    v-if="schedule"
    id="schedule-container"
  >
    <classes @selected="subjectSelected"/>
    <drag-and-drop-area
      :course="course"
      :subject="subject"
      :terms="terms"
      @changeSubject="subjectSelected"
    />
  </div>
</template>
<script>
import Classes from 'Components/scheduling/classes.component';
import DragAndDropArea from 'Components/scheduling/drag-and-drop-area.component';
import { mapGetters } from 'vuex';

import { Term } from 'Models/term.model';

export default {
  name: 'Home',
  components: {
    Classes,
    DragAndDropArea,
  },
  data: () => ({
    terms: null,
    subject: null,
    course: null,
  }),
  computed: {
    ...mapGetters('schedule', {
      schedule: 'get',
    }),
  },
  methods: {
    subjectSelected(payload) {
      const { course, subject } = payload;
      this.terms = _.map(subject.terms[course.id], (t) => {
        return !t.assinged ? new Term({ ...t, course, subject }) : null;
      });
      this.course = course;
      this.subject = subject;
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

<template>
  <v-dialog
    :overlay="false"
    :value="true"
    scrollable
    persistent
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        <div class="title">Creating new schedule</div>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-validate="'required'"
            v-model="name"
            :error-messages="errors.collect('name')"
            name="name"
            label="Name"
            autofocus
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-layout
          row
          justify-space-between
        >
          <v-btn
            flat
            @click="cancel"
          >Cancel</v-btn>
          <v-btn
            :disabled="errors.has('name')"
            flat
            @click="confirm"
          >Confirm</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import ScheduleController from 'Controllers/schedule.controller';
import { Schedule } from 'Models/schedule.model';

export default {
  name: 'new-schedule-dialog',
  data: () => ({
    name: null,
  }),
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      const labs = this.$store.getters.classrooms;
      const subjects = this.$store.getters.subjects;
      const courses = this.$store.getters.courses;

      const schedule = Schedule.initialize({
        name: this.name,
        labs,
        subjects,
        courses,
      });

      ScheduleController.create(schedule).then(({ data }) => {
        const s = new Schedule(data);
        this.$store.getters['schedule/all'].push(s);
        this.$emit('confirm', s);
      });
    },
  },
};
</script>

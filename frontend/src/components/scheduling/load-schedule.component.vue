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
        <div class="title">Load schedule</div>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-select
            v-validate="'required'"
            v-model="schedule"
            :error-messages="errors.collect('select')"
            :items="schedules"
            name="select"
            label="Schedule"
            class="input-group--focused"
            item-value="name"
            item-text="name"
            return-object
          ></v-select>
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
            :disabled="errors.has('select')"
            flat
            @click="confirm"
          >Confirm</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'new-schedule-dialog',
  data: () => ({
    schedule: null,
  }),
  computed: {
    ...mapGetters('schedule', {
      schedules: 'available',
    }),
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      this.$emit('confirm', this.schedule);
    },
  },
};
</script>

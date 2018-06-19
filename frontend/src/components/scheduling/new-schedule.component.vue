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
        <v-text-field
          v-model="name"
          :error-messages="errorMsg"
          ref="input"
          name="name"
          label="Name"
          autofocus
          required
          browser-autocomplete="off"
          @change="change"
          @keyup.enter.native="confirm"
        />
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
            :disabled="confirmDisabled"
            flat
            @click="confirm"
          >Confirm</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'new-schedule-dialog',
  data: () => ({
    name: '',
    confirmDisabled: true,
    errorMsg: [],
  }),
  mounted() {
    this.$refs.input.$el.focus();
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      if (this.name !== '') {
        this.$emit('confirm', this.name);
      }
    },
    change(val) {
      if (val === '') {
        this.confirmDisabled = true;
        this.errorMsg = 'Name is required.';
      } else {
        this.confirmDisabled = false;
        this.errorMsg = [];
      }
    },
  },
};
</script>

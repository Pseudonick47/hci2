<template>
  <form
    v-shortcuts="[
      { shortcut: [ 'ctrl', 'enter' ], callback: () => submit(), disabled: isDisabled },
    ]"
  >
    <v-layout row>
    <v-text-field
      v-if="editOrCreate==='create'"
      v-validate="'required'"
      v-model="course.label"
      :error-messages="errors.collect('label')"
      label="Label"
      data-vv-name="label"
      clearable
      required
      autofocus
    ></v-text-field>
    <v-text-field
      v-else
      v-model="course.label"
      label="Label"
      disabled
    ></v-text-field>
    <span>&nbsp;&nbsp;&nbsp;</span>
    <v-text-field
      v-validate="'required'"
      v-model="course.title"
      :error-messages="errors.collect('title')"
      label="Title"
      data-vv-name="title"
      clearable
      required
    ></v-text-field>
    </v-layout>
    <v-text-field
      v-validate="'required'"
      v-model="course.description"
      :error-messages="errors.collect('description')"
      label="Description"
      data-vv-name="description"
      required
      clearable
    ></v-text-field>
    <v-menu
      ref="dateMenu"
      :close-on-content-click="false"
      v-model="dateMenu"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        v-validate="'required'"
        slot="activator"
        v-model="course.date"
        :error-messages="errors.collect('date')"
        label="Date"
        hint="YYYY-MM-DD format"
        persistent-hint
        prepend-icon="event"
        readonly
        clearable
        data-vv-name="date"
        required
      />
      <v-date-picker
        v-model="course.date"
        no-title
        @input="dateMenu = false"/>
    </v-menu>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import { Course } from 'Models/course.model';
import CoursesController from 'Controllers/courses.controller';
import store from 'Store';
import { mapGetters } from 'vuex';

export default {
  name: 'CourseForm',
  computed: {
    ...mapGetters(['currentForm']),
    isDisabled() {
      return this.currentForm !== 'course';
    },
  },
  props: {
    course: {
      type: Course,
      required: false,
      default: () => new Course(),
    },
    editOrCreate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dateMenu: false,
    };
  },
  methods: {
    submit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.editOrCreate === 'create') {
            CoursesController.create(this.course).then(({ data }) => {
              store.commit('addCourse', data);
              this.$alert.success('Successfully added! ');
              this.clear();
            }).
            catch(() => {
              this.$alert.error('Error occurred.');
            });
          } else if (this.editOrCreate === 'edit') {
            this.course.subjects = this.course.subjects.map((x) => x.id);
            CoursesController.update(this.course.id, this.course).then(() => {
              this.$alert.success('Successfully edited! ');
              this.$emit('clicked');
            });
          }
        } else {
          this.$emit('changed');
          this.$alert.warning('Please fill out the form.');
        }
      });
    },
    clear () {
      if (this.editOrCreate === 'edit') {
        const label = this.course.label;
        this.course = new Course();
        this.course.label = label;
      } else {
        this.course = new Course();
      }
      this.$validator.reset();
    },
  },
};
</script>

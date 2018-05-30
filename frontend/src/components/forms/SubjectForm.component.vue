<template>
<div>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <software-form v-if="entity=='software'"></software-form>
      <course-form v-else></course-form>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="close">Cancel</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
  <form
    v-shortcuts="[
      { shortcut: [ 'ctrl', 'enter' ], callback: () => submit(), disabled: isDisabled },
    ]"
  >
    <v-layout row>
    <v-text-field
      v-validate="'required'"
      v-model="subject.label"
      :error-messages="errors.collect('label')"
      label="Label"
      data-vv-name="label"
      required
      autofocus
    ></v-text-field>
    <span>&nbsp;&nbsp;&nbsp;</span>
    <v-text-field
      v-validate="'required'"
      v-model="subject.title"
      :error-messages="errors.collect('title')"
      label="Title"
      data-vv-name="title"
      required
    ></v-text-field>
    </v-layout>
    <v-text-field
      v-validate="'required'"
      v-model="subject.description"
      :error-messages="errors.collect('description')"
      label="Description"
      data-vv-name="description"
      required
    ></v-text-field>
    <v-layout row>
    <v-text-field
      v-validate="'required'"
      v-model.number="subject.groupSize"
      :error-messages="errors.collect('groupSize')"
      label="Group size"
      data-vv-name="groupSize"
      required
      type="number"
    ></v-text-field>
    <span>&nbsp;</span>
    <v-text-field
      v-validate="'required'"
      v-model.number="subject.duration"
      :error-messages="errors.collect('duration')"
      label="Min duration"
      data-vv-name="duration"
      required
      type="number"
    ></v-text-field>
    <span>&nbsp;</span>
    <v-text-field
      v-validate="'required'"
      v-model.number="subject.lessons"
      :error-messages="errors.collect('lessons')"
      label="Lessons"
      data-vv-name="lessons"
      required
      type="number"
    ></v-text-field>
    </v-layout>
    <v-layout row>
    <v-select
      :items="softwareList"
      v-model="subject.software"
      label="Software"
      multiple
    ></v-select>
    <v-btn
      icon
      @click="newSoftware">
      <v-icon>add</v-icon>
    </v-btn>
    </v-layout>
    <v-layout row>
    <v-select
      :items="courseList"
      v-model="subject.course"
      label="Course"
      multiple
    ></v-select>
    <v-btn
      icon
      @click="newCourse">
      <v-icon>add</v-icon>
    </v-btn>
    </v-layout>
    <v-layout row>
    <v-checkbox
      v-model="subject.projector"
      value="yes"
      label="Projector"
      type="checkbox"
    ></v-checkbox>
    <v-checkbox
      v-model="subject.board"
      value="yes"
      label="Board"
      type="checkbox"
    ></v-checkbox>
    <v-checkbox
      v-model="subject.smartBoard"
      value="yes"
      label="Smart board"
      type="checkbox"
    ></v-checkbox>
    </v-layout>
    <hr>
    <v-layout row>
    <v-checkbox
      v-validate="'required'"
      v-model="subject.os"
      :error-messages="errors.collect('os')"
      value="windows"
      label="Windows"
      data-vv-name="os"
      type="checkbox"
    ></v-checkbox>
   <v-checkbox
      v-validate="'required'"
      v-model="subject.os"
      :error-messages="errors.collect('os')"
      value="linux"
      label="Linux"
      data-vv-name="os"
      type="checkbox"
    ></v-checkbox>
    </v-layout>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</div>
</template>

<script>
import CourseForm from 'Components/forms/CourseForm.component';
import SoftwareForm from 'Components/forms/SoftwareForm.component';
import { Subject } from 'Models/subject.model';
import SubjectsController from 'Controllers/subjects.controller';
import store from 'Store';
import { mapGetters } from 'vuex';

export default {
  name: 'SubjectForm',
  components: { CourseForm, SoftwareForm },
  computed: {
    ...mapGetters([
      'softwares',
      'courses',
      'currentForm',
    ]),
    isDisabled() {
      return this.currentForm !== 'subject';
    },
    softwareList() {
      return _.map(this.softwares, (x) => x.title);
    },
    courseList() {
      return _.map(this.courses, (x) => x.title);
    },
  },
  data: () => ({
    subject: new Subject(),
    entity: '',
    dialog: false,
  }),
  methods: {
    submit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          SubjectsController.create(this.subject).then(({ data }) => {
            this.$alert.success('Successfully added! ');
            store.commit('addSubject', data);
          }).
          catch(() => {
            this.$alert.error('Error occurred.');
          });
        } else {
          this.$alert.warning('Please fill out the form.');
        }
      });
    },
    clear () {
      this.subject = new Subject();
      this.$validator.reset();
    },
    newSoftware() {
      this.entity = 'software';
      this.dialog = true;
    },
    newCourse() {
      this.entity = 'course';
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.type = '';
    },
  },
};
</script>

<template>
<div>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <software-form :editOrCreate="'create'" v-if="entity=='software'" @clicked="closeChildDialog" @change="warning"></software-form>
      <course-form :editOrCreate="'create'" v-else @clicked="closeChildDialog" @change="warning"></course-form>
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
      clearable
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
      clearable
    ></v-text-field>
    </v-layout>
    <v-text-field
      v-validate="'required'"
      v-model="subject.description"
      :error-messages="errors.collect('description')"
      label="Description"
      data-vv-name="description"
      required
      clearable
    ></v-text-field>
    <v-layout row>
    <v-text-field
      v-validate="'required'"
      v-model.number="subject.groupSize"
      :error-messages="errors.collect('groupSize')"
      label="Group size"
      data-vv-name="groupSize"
      required
      clearable
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
      clearable
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
      clearable
      type="number"
    ></v-text-field>
    </v-layout>
    <v-layout row>
    <v-select
      :items="courseList"
      v-model="subject.course"
      label="Choose courses"
      multiple
      item-text="title"
      item-value="id"
    ></v-select>
    <v-tooltip bottom>
      <v-btn
        slot="activator"
        icon
        @click="newCourse">
        <v-icon>add</v-icon>
      </v-btn>
      <span>Create course</span>
    </v-tooltip>
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
    <v-layout row>
    <v-select
      :items="softwareList"
      v-model="subject.software"
      label="Choose software"
      multiple
      autocomplete
      item-text="title"
      item-value="id"
      hint="Please select OS first!"
    ></v-select>
    <v-tooltip bottom>
      <v-btn
        slot="activator"
        icon
        @click="newSoftware">
        <v-icon>add</v-icon>
      </v-btn>
      <span>Create software</span>
    </v-tooltip>
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
      'windowsSoftwares',
      'linuxSoftwares',
      'courses',
      'currentForm',
    ]),
    isDisabled() {
      return this.currentForm !== 'subject';
    },
    softwareList() {
      if (this.subject.os.length === 1 && this.subject.os[0] === 'windows') {
        return _.map(this.windowsSoftwares, (x) => x);
      } else if (this.subject.os.length === 1 && this.subject.os[0] === 'linux') {
        return _.map(this.linuxSoftwares, (x) => x);
      } else if (this.subject.os.length === 2) {
        return _.map(this.softwares, (x) => x);
      }
      return _.map([]);
    },
    courseList() {
      return _.map(this.courses, (x) => x);
    },
  },
  props: {
    subject: {
      type: Subject,
      required: false,
      default: () => new Subject(),
    },
    editOrCreate: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    entity: '',
    dialog: false,
  }),
  beforeMount() {
    console.log(this.subject);
  },
  methods: {
    submit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.subject.terms = {};
          _.each(this.subject.course, (course) => {
            this.subject.terms[course] = _.times(this.subject.lessons, (i) => ({
              id: i,
              assigned: false,
              row: null,
              col: null,
              rowspan: Math.ceil(this.subject.duration / 15),
            }));
          });

          if (this.editOrCreate === 'create') {
            SubjectsController.create(this.subject).then(({ data }) => {
              this.$alert.success('Successfully added! ');
              store.commit('addSubject', data);
              this.clear();
            }).
            catch(() => {
              this.$alert.error('Error occurred.');
            });
          } else if (this.editOrCreate === 'edit') {
            SubjectsController.update(this.subject.id, this.subject).then(() => {
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
      this.entity = '';
    },
    closeChildDialog(value) {
      this.dialog = value;
    },
    warning() {
      this.$alert.warning('Please fill out the form.');
    },
  },
};
</script>

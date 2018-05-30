<template>
  <div class="entities-wrapper">
    <v-tabs
      slot="extension"
      v-model="tab"
      grow
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        v-for="item in tabs"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item">
        <v-layout row class="pt-5 mb-2">
          <v-flex
            sm5
            md5
            class="mx-2"
          >
            <v-card class="pa-2">
              <classroom-form v-if="item=='classroom'"></classroom-form>
              <subject-form v-if="item=='subject'"></subject-form>
              <software-form v-if="item=='software'"></software-form>
              <course-form v-if="item=='course'"></course-form>
            </v-card>
          </v-flex>
          <v-flex
            sm7
            md7
            class="mx-2"
          >
            <v-card flat>
              <Table
                :headers="getHeaders(item)"
                :title="item"
                :data="data[item]"
              ></Table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Table from 'Components/table.component';
import ClassroomForm from 'Components/forms/ClassroomForm.component';
import SubjectForm from 'Components/forms/SubjectForm.component';
import SoftwareForm from 'Components/forms/SoftwareForm.component';
import CourseForm from 'Components/forms/CourseForm.component';
import CoursesController from 'Controllers/courses.controller';
import SubjectsController from 'Controllers/subjects.controller';
import ClassroomsController from 'Controllers/classrooms.controller';
import SoftwareController from 'Controllers/software.controller';
import store from 'Store';

export default {
  name: 'Entities',
  components: { Table, ClassroomForm, SubjectForm, SoftwareForm, CourseForm },
  data () {
    return {
      tab: null,
      softwareFormOpen: false,
      subjectFormOpen: false,
      classroomFormOpen: false,
      courseFormOpen: false,
    };
  },
  computed: {
    data() {
      return {
        software: this.softwares,
        course: this.courses,
        subject: this.subjects,
        classroom: this.classrooms,
      };
    },
    ...mapGetters([
      'headers',
      'tabs',
      'classrooms',
      'subjects',
      'courses',
      'softwares',
    ]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    addSoftware(x) {
      this.softwareFormOpen = false;
      this.software.push(x);
    },
    addClassroom(x) {
      this.classroomFormOpen = false;
      this.classroom.push(x);
    },
    addSubject(x) {
      this.subjectFormOpen = false;
      this.subject.push(x);
    },
    addCourse(x) {
      this.courseFormOpen = false;
      this.course.push(x);
    },
    getData() {
      ClassroomsController.list().then(({ data }) => {
        store.commit('setClassrooms', data);
        // this.data.classroom = _.map(response.data, (x) => new Classroom(x));
      });
      CoursesController.list().then(({ data }) => {
        store.commit('setCourses', data);
        // this.data.course = _.map(response.data, (x) => new Course(x));
      });
      SubjectsController.list().then(({ data }) => {
        store.commit('setSubjects', data);
        // this.data.subject = _.map(response.data, (x) => new Subject(x));
      });
      SoftwareController.list().then(({ data }) => {
        store.commit('setSoftwares', data);
        // this.data.software = _.map(response.data, (x) => new Software(x));
      });
    },
    getHeaders(entity) {
      return this.headers[entity];
    },
  },
};
</script>
<style>
.entities-wrapper {
  flex: 1;
}
</style>

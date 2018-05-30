<template>
  <div
    class="entities-wrapper"
    v-shortcuts="[
      { shortcut: [ 'ctrl', '1' ], callback: () => setTab('0') },
      { shortcut: [ 'ctrl', '2' ], callback: () => setTab('1') },
      { shortcut: [ 'ctrl', '3' ], callback: () => setTab('2') },
      { shortcut: [ 'ctrl', '4' ], callback: () => setTab('3') },
    ]"
  >
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
import { TAB_VALUES } from './../constants';
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
  watch: {
    tab(x) {
      store.commit('setCurrentForm', TAB_VALUES[x]);
    },
  },
  methods: {
    setTab(x) {
      this.tab = x;
    },
    getData() {
      ClassroomsController.list().then(({ data }) => {
        store.commit('setClassrooms', data);
      });
      CoursesController.list().then(({ data }) => {
        store.commit('setCourses', data);
      });
      SubjectsController.list().then(({ data }) => {
        store.commit('setSubjects', data);
      });
      SoftwareController.list().then(({ data }) => {
        store.commit('setSoftwares', data);
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

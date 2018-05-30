<template>
  <div>
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
        <v-layout row>
          <v-flex sm4>
            <classroom-form v-if="item=='classroom'"></classroom-form>
            <subject-form v-if="item=='subject'"></subject-form>
            <software-form v-if="item=='software'"></software-form>
            <course-form v-if="item=='course'"></course-form>
          </v-flex>
          <v-flex
            sm7
            offset-sm1
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
import * as _ from 'lodash';
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
import { Course } from 'Models/course.model';
import { Subject } from 'Models/subject.model';
import { Software } from 'Models/software.model';
import { Classroom } from 'Models/classroom.model';

export default {
  components: { Table, ClassroomForm, SubjectForm, SoftwareForm, CourseForm },
  data () {
    return {
      tab: null,
      data: {
        classroom: [],
        subject: [],
        course: [],
        software: [],
      },
    };
  },
  computed: {
    ...mapGetters([
      'headers',
      'tabs',
    ]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      ClassroomsController.list().then((response) => {
        this.data['classroom'] = _.map(response.data, (x) => new Classroom(x));
      });
      CoursesController.list().then((response) => {
        this.data['course'] = _.map(response.data, (x) => new Course(x));
      });
      SubjectsController.list().then((response) => {
        this.data['subject'] = _.map(response.data, (x) => new Subject(x));
      });
      SoftwareController.list().then((response) => {
        this.data['software'] = _.map(response.data, (x) => new Software(x));
      });
    },
    getHeaders(entity) {
      return this.headers[entity];
    },
  },
};
</script>

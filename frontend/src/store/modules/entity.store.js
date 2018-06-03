import Vue from 'vue';
import { Classroom } from 'Models/classroom.model';
import { Subject } from 'Models/subject.model';
import { Software } from 'Models/software.model';
import { Course } from 'Models/course.model';

const state = {
  tabs: [
    'course',
    'classroom',
    'subject',
    'software',
  ],
  headers: {
    'classroom': [
      { text: 'Label', value: 'label' },
      { text: 'Description', value: 'description' },
      { text: 'Capacity', value: 'capacity' },
      { text: 'Projector', value: 'projector' },
      { text: 'Board', value: 'board' },
      { text: 'Smart board', value: 'smartBoard' },
      { text: 'Operating system', value: 'os' },
      { text: 'Software', value: 'software' },
    ], 'subject': [
      { text: 'Label', value: 'label' },
      { text: 'Title', value: 'title' },
      { text: 'Course', value: 'course' },
      { text: 'Description', value: 'description' },
      { text: 'Group size', value: 'groupSize' },
      { text: 'Min duration', value: 'duration' },
      { text: 'Lessons', value: 'lessons' },
      { text: 'Projector', value: 'projector' },
      { text: 'Board', value: 'board' },
      { text: 'Smart board', value: 'smartBoard' },
      { text: 'Operating system', value: 'os' },
      { text: 'Software', value: 'software' },
    ], 'course': [
      { text: 'Label', value: 'label' },
      { text: 'Title', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Date', value: 'date' },
    ], 'software': [
      { text: 'Label', value: 'label' },
      { text: 'Title', value: 'title' },
      { text: 'Operating system', value: 'os' },
      { text: 'Manufacturer', value: 'manufacturer' },
      { text: 'Site', value: 'site' },
      { text: 'Publication year', value: 'year' },
      { text: 'Price', value: 'price' },
      { text: 'Description', value: 'description' },
    ],
  },
  classrooms: {},
  subjects: {},
  courses: {},
  softwares: {},
  currentForm: 'classroom',
};

const getters = {
  headers: (state) => state.headers,
  tabs: (state) => state.tabs,
  classrooms: (state) => _.values(state.classrooms),
  windowsSoftwares: (state) => _.values(_.filter(state.softwares, [
    'os',
    ['windows'],
  ])),
  linuxSoftwares: (state) => _.values(_.filter(state.softwares, [
    'os',
    ['linux'],
  ])),
  softwares: (state) => _.values(state.softwares),
  courses: (state) => _.values(state.courses),
  subjects: (state) => _.values(state.subjects),
  currentForm: (state) => state.currentForm,
};

const mutations = {
  setCurrentForm(state, form) {
    state.currentForm = form;
  },
  addClassroom(state, data) {
    Vue.set(state.classrooms, data.id, new Classroom(data));
  },
  addCourse(state, data) {
    Vue.set(state.courses, data.id, new Course(data));
  },
  addSoftware(state, data) {
    Vue.set(state.softwares, data.id, new Software(data));
  },
  addSubject(state, data) {
    Vue.set(state.subjects, data.id, new Subject(data));
  },
  deleteClassroom(state, data) {
    Vue.delete(state.classrooms, data.id);
  },
  deleteCourse(state, data) {
    Vue.delete(state.courses, data.id);
  },
  deleteSubject(state, data) {
    Vue.delete(state.subjects, data.id);
  },
  deleteSoftware(state, data) {
    Vue.delete(state.softwares, data.id);
  },
  setClassrooms(state, data) {
    _.forEach(data, (x) => {
      Vue.set(state.classrooms, x.id, new Classroom(x));
    });
  },
  setCourses(state, data) {
    _.forEach(data, (x) => {
      Vue.set(state.courses, x.id, new Course(x));
    });
  },
  setSoftwares(state, data) {
    _.forEach(data, (x) => {
      Vue.set(state.softwares, x.id, new Software(x));
    });
  },
  setSubjects(state, data) {
    _.forEach(data, (x) => {
      Vue.set(state.subjects, x.id, new Subject(x));
    });
  },
};

export {
  state,
  getters,
  mutations,
};

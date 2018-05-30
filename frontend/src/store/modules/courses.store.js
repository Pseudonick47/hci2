import { Course } from 'Models/course.model';

const namespaced = true;

const state = {
  courses: [
    {
      id: 'SW',
      name: 'Software engineering',
      classes: [
        {
          id: 'HCI',
          name: 'Human-computer interaction',
        },
        {
          id: 'CIF',
          name: 'Computer intelligence foundations',
        },
        {
          id: 'ISA',
          name: 'Internet software architectures',
        },
      ],
    },
    {
      id: 'RA',
      name: 'Computing and Control Engineering',
      classes: [
        {
          id: 'HCI',
          name: 'Human-computer interaction',
        },
        {
          id: 'CIF',
          name: 'Computer intelligence foundations',
        },
        {
          id: 'WP',
          name: 'Web programming',
        },
      ],
    },
  ],
};

const getters = {
  all: (state) => state.courses,
};

const mutations = {
  set(state, courses) {
    state.courses = _.map(courses, (c) => new Course(c));
  },
};

export {
  namespaced,
  state,
  getters,
  mutations,
};

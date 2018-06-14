import store from 'Store';
import ScheduleApiService from 'Api/schedule.service';

import { ScheduleModel } from 'Models/scheduling/schedule.model';
import { NUM_WORK_DAYS } from '@/constants/days.constants';

export default {
  create(name) {
    const numClassrooms = store.getters.classrooms.length;

    const numColumns = numClassrooms * NUM_WORK_DAYS;

    const schedule = new ScheduleModel(name, 61, numColumns);

    const subjects = store.getters.subjects;

    _.each(subjects, (subject) => {
      _.each(subject.course, (course) => schedule.createTerms(course, subject));
    });

    this.active(schedule);

    ScheduleApiService.create(schedule.export());
  },

  active(schedule) {
    store.commit('schedule/setActive', schedule);
  },

  save(schedule) {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  },

  load() {
    return JSON.parse(localStorage.getItem('schedule'));
  },

  list() {
    return ScheduleApiService.list();
  },

  get(id) {
    ScheduleApiService.get(id).then((data) => {
      const numClassrooms = store.getters.classrooms.length;
      const numColumns = numClassrooms * NUM_WORK_DAYS;

      const model = new ScheduleModel(data.name, 61, numColumns);
      model.insertTerms(data.terms);

      this.active(model);
    });
  },

  fetchAvailable() {
    ScheduleApiService.available().then((data) => {
      store.commit('schedule/setAvailable', data);
    });
  },

  enforceConstraints(subject) {
    const classrooms = store.getters.classrooms;
    const numClassrooms = classrooms.length;

    const toDisable = _.filter(classrooms, (classroom) => this.checkConstraints(subject, classroom));

    const indices = _.map(toDisable, (classroom) => _.findIndex(classrooms, classroom));

    const schedule = store.getters['schedule/active'];
    _.each(indices, (index) => {
      _.times(NUM_WORK_DAYS, (i) => schedule.table.disableColumn(i * numClassrooms + index));
    });
  },

  clearPreviousConstraints() {
    const schedule = store.getters['schedule/active'];
    schedule.table.enableColumns();
  },

  checkConstraints(subject, classroom) {
    if (subject.board === 'yes' && classroom.board === 'no') {
      return false;
    }

    if (subject.smartBoard === 'yes' && classroom.smartBoard === 'no') {
      return false;
    }

    if (subject.projector === 'yes' && classroom.projector === 'no') {
      return false;
    }

    if (subject.groupSize > classroom.capacity) {
      return false;
    }

    let ok = true;
    _.each(subject.os, (os) => {
      if (_.find(classroom.os, (los) => los === os)) {
        ok = false;
      }
    });

    if (!ok) {
      return false;
    }

    ok = true;
    _.each(subject.software, (s) => {
      if (_.find(classroom.software, (ls) => ls.id === s.id)) {
        ok = false;
      }
    });

    if (!ok) {
      return false;
    }

    return true;
  },

  insertClassroom() {
    const index = store.getters.classrooms.length - 1;
    const schedule = store.getters['schedule/active'];

    _.times(NUM_WORK_DAYS, (i) => {
      schedule.table.insertColumn(i * index + index);
    });
  },

  removeClassroom(classroom) {
    const index = _.findIndex(store.getters.classrooms, classroom);
    const schedule = store.getters['schedule/active'];

    let cell = null;
    _.each(schedule.table.cells, (row) => {
      _.times(NUM_WORK_DAYS, (i) => {
        cell = row[i * index + index];
        if (cell.term) {
          cell.term.assigned = false;
          cell.term = null;
        }
      });
    });

    _.times(NUM_WORK_DAYS, (i) => {
      schedule.table.removeColumn(i * index + index);
    });
  },
};

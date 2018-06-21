import store from 'Store';
import ScheduleApiService from 'Api/schedule.service';

import { ScheduleModel } from 'Models/scheduling/schedule.model';
import { NUM_WORK_DAYS } from '@/constants/days.constants';

export default {
  saveInterval: null,
  updateInterval: null,

  create(name) {
    this.update();

    const numClassrooms = store.getters.classrooms.length;

    const numColumns = numClassrooms * NUM_WORK_DAYS;

    const schedule = new ScheduleModel('', name, 61, numColumns);

    const subjects = store.getters.subjects;

    _.each(subjects, (subject) => {
      schedule.createTerms(subject);
    });

    ScheduleApiService.create(schedule.export()).then(({ data }) => {
      this.active(this.import(data));
    });
  },

  active(schedule) {
    store.commit('schedule/setActive', schedule);
    this.persist(schedule);

    if (this.saveInterval) {
      clearInterval(this.saveInterval);
    }

    this.saveInterval = setInterval(this.save, 10000);

    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(this.update, 60000);
  },

  load() {
    const s = JSON.parse(localStorage.getItem('schedule'));
    if (s) {
      s.schedule.id = s.id;
      this.active(this.import(s.schedule));
    }
  },

  save() {
    const schedule = store.getters['schedule/active'];
    if (schedule && schedule.dirty) {
      const s = { id: schedule.id, schedule: schedule.export() };
      localStorage.setItem('schedule', JSON.stringify(s));
      schedule.dirty = false;
    }
  },

  update() {
    const schedule = store.getters['schedule/active'];
    if (schedule && schedule.changed) {
      ScheduleApiService.update(schedule.id, schedule.export());
      schedule.changed = false;
    }
  },

  persist(schedule) {
    const s = { id: schedule.id, schedule: schedule.export() };
    localStorage.setItem('schedule', JSON.stringify(s));
  },

  list() {
    return ScheduleApiService.list();
  },

  get(id) {
    ScheduleApiService.get(id).then(({ data }) => {
      this.update();
      this.active(this.import(data));
    });
  },

  import(data) {
    const courses = store.getters.courses;
    const subjects = store.getters.subjects;

    _.forOwn(data.terms, (subs, course) => {
      _.forOwn(subs, (terms, subject) => {
        _.each(terms, (term) => {
          term.course = _.find(courses, [
            'label',
            course,
          ]);
          term.subject = _.find(subjects, [
            'label',
            subject,
          ]);
        });
      });
    });

    const numClassrooms = store.getters.classrooms.length;
    const numColumns = numClassrooms * NUM_WORK_DAYS;

    return new ScheduleModel(data.id, data.name, 61, numColumns, data.terms);
  },

  fetchAvailable() {
    ScheduleApiService.available().then(({ data }) => {
      store.commit('schedule/setAvailable', data);
    });
  },

  enforceConstraints(subject) {
    const classrooms = store.getters.classrooms;
    const numClassrooms = classrooms.length;

    const toDisable = _.filter(classrooms, (classroom) => !this.checkConstraints(subject, classroom));

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
      if (!_.find(classroom.os, (los) => los === os)) {
        ok = false;
      }
    });

    if (!ok) {
      return false;
    }

    ok = true;
    _.each(subject.software, (s) => {
      if (!_.find(classroom.software, (ls) => ls.id === s.id)) {
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
      schedule.table.insertColumn((NUM_WORK_DAYS - i - 1) * index + index);
    });

    schedule.dirty = true;
    schedule.changed = true;
  },

  removeClassroom(classroom) {
    const index = _.findIndex(store.getters.classrooms, [
      'id',
      classroom.id,
    ]);
    const numClassrooms = store.getters.classrooms.length;
    const schedule = store.getters['schedule/active'];

    let cell = null;
    _.each(schedule.table.cells, (row) => {
      _.times(NUM_WORK_DAYS, (i) => {
        cell = row[i * numClassrooms + index];
        if (cell.term) {
          cell.term.assigned = false;
          cell.term.row = null;
          cell.term.col = null;
          cell.term = null;
        }
      });
    });

    _.times(NUM_WORK_DAYS, (i) => {
      schedule.table.removeColumn((NUM_WORK_DAYS - i - 1) * numClassrooms + index);
    });

    schedule.dirty = true;
    schedule.changed = true;
  },

  insertSubject(subject) {
    const schedule = store.getters['schedule/active'];

    schedule.createTerms(subject);

    schedule.dirty = true;
    schedule.changed = true;
  },

  removeSubject(subject) {
    const schedule = store.getters['schedule/active'];

    schedule.removeTerms(subject);

    schedule.dirty = true;
    schedule.changed = true;
  },
};

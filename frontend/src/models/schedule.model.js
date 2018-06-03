import * as _ from 'lodash';

import { WORK_DAYS } from '@/constants/days.constants';
import TimeHelper from '@/helpers/time.helper';

export class Schedule {
  instance = 0;

  constructor(schedule = null) {
    _.assign(this, schedule);
  }

  static initialize(props) {
    const name = props.name;

    const labs = _.map(props.labs, 'label');
    const days = _.values(WORK_DAYS);

    const headers = _.map(days, (day) => ({
      text: day,
      colspan: labs.length,
      rowspan: 1,
      subheaders: _.map(labs, (lab) => ({ text: lab, colspan: 1 })),
    }));

    const indexHeader = { text: 'Time', colspan: 1, rowspan: 2 };

    const indices = TimeHelper.generateTimePoints(420, 1320, 15);

    const n_cells = days.length * labs.length;

    const cells = _.times(indices.length, (i) =>
      _.times(n_cells, (j) => ({
        row: i,
        col: j,
        visible: true,
        active: true,
        colspan: 1,
        rowspan: 1,
        dropzone: false,
        changeable: true,
        dropeffect: 'none',
        draggable: false,
        grabbed: false,
      })));

    const terms = {};

    _.each(props.courses, (course) => {
      terms[course.id] = {};
      _.each(props.subjects, (subject) => {
        if (_.find(subject.course, (c) => c.id === course.id)) {
          terms[course.id][subject.id] = _.times(subject.lessons, (i) => {
            return {
              row: i,
              col: null,
              visible: true,
              active: true,
              colspan: 1,
              rowspan: Math.ceil(subject.duration / 15),
              dropzone: false,
              changeable: false,
              dropeffect: 'none',
              draggable: true,
              grabbed: false,
              assigned: false,
              course,
              subject,
            };
          });
        }
      });
    });

    return new Schedule({ name, headers, indices, indexHeader, cells, terms });
  }

  insertData(data) {
    _.each(data, (point) => _.assign(this.cells[point.row][point.col], point));
  }
}

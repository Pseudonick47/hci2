import * as _ from 'lodash';

import { WORK_DAYS } from '@/constants/days.constants';
import TimeHelper from '@/helpers/time.helper';

export class ScheduleModel {
  instance = 0;

  constructor(props, schedule = null) {
    this.initialize(props);

    if (schedule) {
      this.name = schedule.name;
      this.insertData(schedule.data);
    } else {
      this.name = `Schedule ${this.instance}`;
    }
  }

  initialize(props) {
    const labs = _.map(props.labs, 'label');
    const days = _.values(WORK_DAYS);

    this.headers = _.map(days, (day) => ({
      text: day,
      colspan: labs.length,
      rowspan: 1,
      subheaders: _.map(labs, (lab) => ({ text: lab, colspan: 1 })),
    }));

    this.indexHeader = { text: 'Time', colspan: 1, rowspan: 2 };

    this.indices = TimeHelper.generateTimePoints(420, 1320, 15);

    this.cells = [];

    const n_cells = days.length * labs.length;

    this.cells = _.times(this.indices.length, (i) =>
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
  }

  insertData(data) {
    _.each(data, (point) => _.assign(this.cells[point.row][point.col], point));
  }

  // static testModel() {
  //   const name = 'test-schedule';

  //   const labs = [
  //     'L1',
  //     'L2',
  //     'L3',
  //     'L4',
  //     'L5',
  //     'L6',
  //   ];

  //   const days = [
  //     'MON',
  //     'TUE',
  //     'WED',
  //     'THU',
  //     'FRI',
  //     'SAT',
  //   ];

  //   const headers = [];

  //   _.each(days, (day) => {
  //     const subheaders = [];

  //     _.each(labs, (lab) => {
  //       subheaders.push({ text: lab, colspan: 1 });
  //     });

  //     headers.push({ text: day, colspan: labs.length, rowspan: 1, subheaders });
  //   });

  //   const indexHeader = { text: 'Time', colspan: 1, rowspan: 2 };
  //   const indices = this.generateTimePoints(420, 1320, 15);
  //   const cells = [];

  //   const n_cells = days.length * labs.length;

  //   _.times(indices.length, (i) => {
  //     const row = [];

  //     _.times(n_cells, (j) => {
  //       row.push({
  //         row: i,
  //         col: j,
  //         visible: true,
  //         active: true,
  //         colspan: 1,
  //         rowspan: 1,
  //         dropzone: false,
  //         changeable: true,
  //         dropeffect: 'none',
  //         draggable: false,
  //         grabbed: false,
  //       });
  //     });

  //     cells.push(row);
  //   });

  //   return new ScheduleModel({
  //     name,
  //     headers,
  //     indexHeader,
  //     indices,
  //     cells,
  //   });
  // }
}

import * as _ from 'lodash';

export class TableModel {
  constructor(data) {
    this.headers = [];
    _.assign(this, data);
  }

  static testModel() {
    const name = 'test-schedule';

    const labs = [
      'L1',
      'L2',
      'L3',
      'L4',
      'L5',
      'L6',
    ];

    const days = [
      'MON',
      'TUE',
      'WED',
      'THU',
      'FRI',
      'SAT',
    ];

    const headers = [];
    _.each(days, (day) => {
      const subheaders = [];

      _.each(labs, (lab) => {
        subheaders.push({ text: lab, colspan: 1 });
      });

      headers.push({ text: day, colspan: labs.length, subheaders });
    });

    const timePoints = this.generateTimePoints(420, 1320, 15);
    const data = [];

    const n_cols = days.length * labs.length;

    _.each(timePoints, (point) => {
      const row = [];

      row.push({
        active: true,
        disabled: false,
        colspan: 1,
        rowspan: 1,
        text: point,
        replaceable: false,
        meta: 'index',
      });

      _.times(n_cols, () => {
        row.push({
          active: true,
          disabled: false,
          colspan: 1,
          rowspan: 1,
          replaceable: true,
        });
      });

      data.push(row);
    });

    return new TableModel({ name, headers, data });
  }

  static generateTimePoints(start, end, step) {
    const ret = [];
    let c = start;

    let h = null;
    let m = null;
    while (c <= end) {
      h = Math.floor(c / 60);
      m = c % 60;

      ret.push(`${this.pad(h)}:${this.pad(m)}`);

      c += step;
    }

    return ret;
  }

  static pad(num) {
    if (num >= 10) {
      return `${num}`;
    }
    return `0${num}`;
  }
}

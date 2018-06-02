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

      headers.push({ text: day, colspan: labs.length, rowspan: 1, subheaders });
    });

    const indexHeader = { text: 'Time', colspan: 1, rowspan: 2 };
    const indices = this.generateTimePoints(420, 1320, 15);
    const cells = [];

    const n_cells = days.length * labs.length;

    _.times(indices.length, (i) => {
      const row = [];

      _.times(n_cells, (j) => {
        row.push({
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
        });
      });

      cells.push(row);
    });

    return new TableModel({
      name,
      headers,
      indexHeader,
      indices,
      cells,
    });
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

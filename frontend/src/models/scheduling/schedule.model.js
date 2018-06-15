import { ScheduleTable } from './schedule-table.model';
import { ScheduleTerm } from './schedule-term.model';
import { ScheduleCell } from './schedule-cell.model';

export class ScheduleModel {
  constructor(id, name, n, m, terms) {
    this.id = id;
    this.name = name;
    this.terms = {};
    this.table = new ScheduleTable(n, m);

    this.insertTerms(terms);

    this.dirty = false;
    this.changed = false;
  }

  export() {
    const data = { name: this.name, terms: {} };
    _.forOwn(this.terms, (subjects, course) => {
      data.terms[course] = {};
      _.forOwn(subjects, (terms, subject) => {
        data.terms[course][subject] = _.map(terms.data, (term) => {
          return _.pick(term, [
            'assigned',
            'row',
            'col',
            'number',
            'cellspan',
          ]);
        });
      });
    });
    return data;
  }

  insertTerms(terms) {
    let data = null;
    let sub = null;
    let cellspan = null;
    let nRows = null;
    let table = null;
    let term = null;
    let row = null;

    _.forOwn(terms, (subjects, course) => {
      if (!_.has(this.terms, course)) {
        this.terms[course] = {};
      }

      _.forOwn(subjects, (terms, subject) => {
        data = [];

        sub = terms[0].subject;
        cellspan = Math.ceil(sub.duration / 15);
        nRows = sub.lessons * cellspan + sub.lessons;
        table = new ScheduleTable(nRows, 1);

        term = null;
        _.each(terms, (t, i) => {
          term = new ScheduleTerm(t);
          data.push(term);

          row = i * (cellspan + 1);
          if (!term.row) {
            table.cells[row][0] = new ScheduleCell({
              row,
              col: 0,
              rowspan: cellspan,
              draggable: true,
              changeable: false,
              term,
            });
          } else {
            this.table.mergeCells(term.row, term.col, cellspan);
            this.table.cells[term.row][term.col].update({
              changeable: false,
              draggable: true,
              term,
            });
          }
        });

        this.terms[course][subject] = { data, table };
      });
    });
  }

  createTerms(subject) {
    const s = subject.label;

    const cellspan = Math.ceil(subject.duration / 15);
    const nRows = subject.lessons * cellspan + subject.lessons;

    let c = null;
    let table = null;
    let term = null;
    let row = null;

    _.each(subject.course, (course) => {
      c = course.label;
      if (!_.has(this.terms, c)) {
        this.terms[c] = {};
      }

      if (!_.has(this.terms[c], s)) {
        this.terms[c][s] = {};
        this.terms[c][s].data = [];
      }

      table = new ScheduleTable(nRows, 1);

      _.times(subject.lessons, (i) => {
        term = new ScheduleTerm({ course, subject, cellspan, number: i });
        this.terms[c][s].data.push(term);

        row = i * (cellspan + 1);
        table.cells[row][0] = new ScheduleCell({
          row,
          col: 0,
          rowspan: cellspan,
          draggable: true,
          changeable: false,
          term,
        });

        table.mergeCells(row, 0, cellspan);
      });

      this.terms[c][s].table = table;
    });
  }

  removeTerms(subject) {
    const s = subject.label;

    let c = null;

    _.each(subject.course, (course) => {
      c = course.label;

      if (!_.has(this.terms, c)) {
        return;
      }

      if (!_.has(this.terms[c], s)) {
        return;
      }

      _.each(this.terms[c][s].data, (term) => {
        if (term.row) {
          this.table.splitCells(term.row, term.col);
          this.table.cells[term.row][term.col].reset();
        }
      });

      delete this.terms[c][s];

      if (_.isEmpty(this.terms[c])) {
        delete this.terms[c];
      }
    });
  }
}

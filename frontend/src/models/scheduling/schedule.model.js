import { ScheduleTable } from './schedule-table.model';
import { ScheduleTerm } from './schedule-term.model';
import { ScheduleCell } from './schedule-cell.model';

export class ScheduleModel {
  constructor(name, n, m, terms) {
    this.name = name;
    this.terms = {};
    this.table = new ScheduleTable(n, m);

    _.each(terms, this.insertTerm);
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
          ]);
        });
      });
    });
    return data;
  }

  insertTerms(terms) {
    _.forOwn(terms, (subjects, course) => {
      if (!_.has(this.terms, course)) {
        this.terms[course] = {};
      }

      _.forOwn(subjects, (terms, subject) => {
        if (!_.has(this.terms[course], subject)) {
          this.terms[course][subject] = {};
          this.terms[course][subject].data = [];
        }
      });
    });
  }

  createTerms(course, subject) {
    const c = course.label;
    const s = subject.label;

    if (!_.has(this.terms, c)) {
      this.terms[c] = {};
    }

    if (!_.has(this.terms[c], s)) {
      this.terms[c][s] = {};
      this.terms[c][s].data = [];
    }

    const cellspan = Math.ceil(subject.duration / 15);
    const nRows = subject.lessons * cellspan + subject.lessons;
    const table = new ScheduleTable(nRows, 1);

    _.times(subject.lessons, (i) => {
      const term = new ScheduleTerm({ course, subject, cellspan, number: i });
      this.terms[c][s].data.push(term);

      const row = i * (cellspan + 1);
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
  }

  removeTerms(course, subject) {
    const c = course.label;
    const s = subject.label;

    if (!_.has(this.terms, c)) {
      return;
    }

    if (!_.has(this.terms[c], s)) {
      return;
    }

    delete this.terms[c][s];

    if (_.isEmpty(this.terms[c])) {
      delete this.terms[c];
    }
  }
}

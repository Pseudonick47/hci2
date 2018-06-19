export class ScheduleTerm {
  constructor(data) {
    this.course = '';
    this.subject = '';
    this.row = null;
    this.col = null;
    this.number = 0;
    this.cellspan = 0;
    this.assigned = false;

    _.assign(this, data);
  }
}

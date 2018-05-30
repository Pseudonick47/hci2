export class Course {
  constructor(data) {
    this.label = '';
    this.title = '';
    this.description = '';
    this.date = null;
    _.assignWith(this, data);
  }
}

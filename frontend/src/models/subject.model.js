export class Subject {
  constructor(data) {
    this.label = '';
    this.description = '';
    this.software = [];
    this.groupSize = null;
    this.projector = 'no';
    this.board = 'no';
    this.course = null;
    this.title = null;
    this.smartBoard = 'no';
    this.os = [];
    this.duration = null;
    this.lessons = null;
    this.terms = [];
    _.assignWith(this, data);
  }
}

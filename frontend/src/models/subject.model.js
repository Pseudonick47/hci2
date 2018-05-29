import * as _ from 'lodash';

export class Subject {
  constructor(data) {
    this.label = '';
    this.description = '';
    this.sofware = [];
    this.groupSize = null;
    this.projector = null;
    this.board = null;
    this.course = null;
    this.title = null;
    this.smartBoard = null;
    this.os = [];
    this.duration = null;
    this.lessons = null;
    _.assignWith(this, data);
  }
}

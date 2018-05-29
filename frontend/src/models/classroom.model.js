import * as _ from 'lodash';

export class Classroom {
  constructor(data) {
    this.label = '';
    this.description = '';
    this.capacity = null;
    this.software = [];
    this.projector = null;
    this.board = null;
    this.smartBoard = null;
    this.os = [];
    _.assignWith(this, data);
  }
}

import * as _ from 'lodash';

export class Classroom {
  constructor(data) {
    this.label = '';
    this.description = '';
    this.capacity = null;
    this.software = [];
    this.projector = 'no';
    this.board = 'no';
    this.smartBoard = 'no';
    this.os = [];
    _.assignWith(this, data);
  }
}

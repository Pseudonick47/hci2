import * as _ from 'lodash';

export class Software {
  constructor(data) {
    this.label = '';
    this.description = '';
    this.manufacturer = '';
    this.site = '';
    this.price = null;
    this.year = null;
    this.os = [];
    _.assignWith(this, data);
  }
}

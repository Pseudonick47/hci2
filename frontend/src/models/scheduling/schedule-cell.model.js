export class ScheduleCell {
  constructor(data) {
    this.initialize();
    this.update(data);
  }

  initialize() {
    this.row = null;
    this.col = null;
    this.rowspan = 1;
    this.disabled = false;
    this.visible = true;
    this.changeable = true;
    this.draggable = false;
    this.dropzone = false;
    this.selected = false;
    this.term = null;
    this.mergedWith = null;
    this.affiliated = [];
  }

  isMerged() {
    return _.isNull(this.mergedWith);
  }

  merge(cell) {
    this.changeable = cell.changeable;
    this.draggable = cell.draggable;
    this.dropzone = cell.dropzone;
    this.visible = false;
    this.mergedWith = cell;
  }

  update(data) {
    _.assign(this, data);
  }

  reset() {
    this.changeable = true;
    this.draggable = false;
    this.dropzone = false;
    this.visible = true;
    this.mergedWith = null;
    this.term = null;
  }
}

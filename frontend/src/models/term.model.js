export class Term {
  constructor(data) {
    this.row = null;
    this.col = null;
    this.visible = true;
    this.active = true;
    this.colspan = 1;
    this.rowspan = 1;
    this.dropzone = false;
    this.changeable = false;
    this.dropeffect = 'none';
    this.draggable = true;
    this.grabbed = false;
    this.assigned = false;

    _.assign(this, data);
  }
}

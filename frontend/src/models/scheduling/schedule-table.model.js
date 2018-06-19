import { ScheduleCell } from './schedule-cell.model';

export class ScheduleTable {
  constructor(n = 0, m = 0) {
    this.rowCount = n;
    this.colCount = m;
    this.cells = [];

    _.times(n, (i) => {
      const row = _.times(m, (j) => new ScheduleCell({ row: i, col: j }));
      this.cells.push(row);
    });
  }

  getCell(row, col) {
    if (row >= this.rowCount) {
      throw new RangeError('Row index outside the bounds of ScheduleTable');
    }

    if (col >= this.colCount) {
      throw new RangeError('Column index outside the bounds of ScheduleTable');
    }

    return this.cells[row][col];
  }

  getCells(row, col, n, m) {
    const cells = [];

    _.each(_.range(row, row + n), (i) => {
      _.each(_.range(col, col + m), (j) => {
        cells.push(this.getCell(i, j));
      });
    });

    return cells;
  }

  insertRow(index) {
    const row = _.times(this.colCount, (i) => {
      return new ScheduleCell({ row: index, col: i });
    });

    this.cells.splice(index, 0, row);

    this.rowCount += 1;

    _.times(_.range(index + 1, this.rowCount), (i) => {
      _.each(this.cells[i], (cell) => {
        cell.row += 1;
      });
    });
  }

  removeRow(index) {
    if (index >= this.rowCount) {
      throw new RangeError('Row index outside the bounds of ScheduleTable');
    }

    this.cells.splice(index, 1);

    this.rowCount -= 1;

    _.times(_.range(index, this.rowCount), (i) => {
      _.each(this.cells[i], (cell) => {
        cell.row -= 1;
      });
    });
  }

  hideRow(index) {
    if (index >= this.rowCount) {
      throw new RangeError('Row index outside the bounds of ScheduleTable');
    }

    _.each(this.cells[index], (cell) => {
      cell.visible = false;
    });
  }

  showRow(index) {
    if (index >= this.rowCount) {
      throw new RangeError('Row index outside the bounds of ScheduleTable');
    }

    _.each(this.cells[index], (cell) => {
      cell.visible = true;
    });
  }

  enableRow(index) {
    if (index >= this.rowCount) {
      throw new RangeError('Row index outside the bounds of ScheduleTable');
    }

    _.each(this.cells[index], (cell) => {
      cell.disabled = false;
    });
  }

  disableRow(index) {
    if (index >= this.rowCount) {
      throw new RangeError('Row index outside the bounds of ScheduleTable');
    }

    _.each(this.cells[index], (cell) => {
      cell.disabled = true;
    });
  }

  insertColumn(index) {
    let cell = null;

    _.times(this.rowCount, (i) => {
      cell = new ScheduleCell({ row: i, col: index });
      this.cells[i].splice(index, 0, cell);
    });

    this.colCount += 1;

    _.each(this.cells, (row) => {
      _.each(_.range(index + 1, this.colCount), (i) => {
        row[i].col += 1;
      });
    });
  }

  removeColumn(index) {
    if (index >= this.colCount) {
      throw new RangeError('Column index outside the bounds of ScheduleTable');
    }

    _.each(this.cells, (row) => row.splice(index, 1));

    this.colCount -= 1;

    _.each(this.cells, (row) => {
      _.each(_.range(index, this.colCount), (i) => {
        row[i].col -= 1;
      });
    });
  }

  hideColumn(index) {
    if (index >= this.colCount) {
      throw new RangeError('Column index outside the bounds of ScheduleTable');
    }

    _.each(this.cells, (row) => {
      row[index].visible = false;
    });
  }


  showColumn(index) {
    if (index >= this.colCount) {
      throw new RangeError('Column index outside the bounds of ScheduleTable');
    }

    _.each(this.cells, (row) => {
      row[index].visible = true;
    });
  }

  enableColumns() {
    if (this.rowCount === 0 || this.colCount === 0) {
      return;
    }

    _.times(this.colCount, (i) => {
      if (this.cells[0][i].disabled) {
        this.enableColumn(i);
      }
    });
  }

  enableColumn(index) {
    if (index >= this.colCount) {
      throw new RangeError('Column index outside the bounds of ScheduleTable');
    }

    _.each(this.cells, (row) => {
      row[index].disabled = false;
    });
  }

  disableColumn(index) {
    if (index >= this.colCount) {
      throw new RangeError('Column index outside the bounds of ScheduleTable');
    }

    _.each(this.cells, (row) => {
      row[index].disabled = true;
    });
  }

  mergeCells(row, col, n) {
    if (row + n > this.rowCount) {
      throw new RangeError('Row index outside the bounds of ScheduleTable');
    }

    if (col >= this.colCount) {
      throw new RangeError('Column index outside the bounds of ScheduleTable');
    }

    const cell = this.cells[row][col];
    cell.rowspan = n;

    _.times(n, (i) => {
      if (i === 0) {
        return;
      }
      cell.affiliated.push(this.cells[row + i][col]);
      this.cells[row + i][col].merge(cell);
    });
  }

  splitCells(row, col) {
    const cell = this.cells[row][col];
    cell.rowspan = 1;
    _.each(cell.affiliated, (c) => c.reset());
    cell.affiliated = [];
  }
}

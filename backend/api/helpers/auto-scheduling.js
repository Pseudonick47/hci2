function checkConstraints(term, lab) {
  const subject = term.subject;

  sails.log(subject);
  sails.log(lab);

  if (subject.board === 'yes' && lab.board === 'no') {
    return false;
  }
  sails.log('board pass');

  if (subject.smartBoard === 'yes' && lab.smartBoard === 'no') {
    return false;
  }
  sails.log('smart board pass');

  if (subject.projector === 'yes' && lab.projector === 'no') {
    return false;
  }
  sails.log('projector pass');

  if (subject.groupSize > lab.capacity) {
    return false;
  }
  sails.log('group size pass');

  let ok = true;
  _.each(subject.os, (os) => {
    if (_.find(lab.os, (los) => los === os)) {
      ok = false;
    }
  });

  sails.log(subject.label, lab.label,  ' OS ', ok);

  if (!ok) {
    return false;
  }

  ok = true;
  _.each(subject.software, (s) => {
    if (_.find(lab.software, (ls) => ls.id === s.id)) {
      ok = false;
    }
  });

  sails.log(subject.label, lab.label, ' software ', ok);

  if (!ok) {
    return false;
  }

  return true;
}

function suitableLabs(term, labs) {
  sails.log(labs);
  return _.filter(labs, (lab) => checkConstraints(term, lab));
}

function assignTerm(term, labs, cells) {
  const availableLabs = suitableLabs(term, labs);
  sails.log('available labs: ' + availableLabs.length);
  // const move = Math.ceil(term.subject.duration / 15);
  let offset = 0;
  while(true) {
    _.each(availableLabs, (lab, i) => {
      if (cells[i][offset] && !cells[i][offset].assigned) {
        term.assigned = true;
        cells[i][offset] = term;
        sails.log(cells[i][offset]);
        return;
      }
    });

    if (term.assigned) {
      break;
    }

    offset += 1;

    if (offset > cells[0].length) {
      throw 'notFeasible';
    }
  }
}

function transpose(matrix) {
  const t = [];

  _.each(matrix, (row) => {
    _.each(row, (col, j) => {
      if (t.length <= j) {
        t.push([]);
      }
      t[j].push(col);
    });
  });

  return t;
}

function init(schedule) {
  const terms = _.flattenDeep(_.map(_.values(schedule.terms), (t) => _.values(t)));

  const cells = transpose(schedule.cells);
  // const labs = _.map(schedule.labs, (lab, i) => ({ lab, i }));
  const labs = schedule.labs;

  _.each(terms, (term) => {
    assignTerm(term, labs, cells);
  });

  schedule.cells = cells;
}

async function auto(inputs, exits) {
  init(inputs.schedule);
  return exits.success();
}


module.exports = {


  friendlyName: 'Auto scheduling',


  description: 'Helper for automatic term scheduling.',


  inputs: {
    schedule: {
      type: 'ref',
    }
  },


  exits: {
    notFeasible: {
      outputFriendlyName: 'Schedule not feasible',
      description: 'Some terms could not be assigned.'
    }
  },


  fn: auto

};


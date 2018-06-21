/**
 * Schedule.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  shiftRight: async (index) => {
    let schedules = await Schedule.find();

    let courses = null;
    let subjects = null;
    let terms = null;

    for (schedule of schedules) {
      courses = _.values(schedule.terms);
      subjects = _.map(courses, _.values);
      terms = _.flattenDeep(subjects);

      _.each(terms, (term) => {
        if (term.assigned && term.col >= index) {
          term.col += 1;
        }
      });

      await Schedule.update({'id': schedule.id}, schedule);
    }
  },

  shiftLeft: async (index) => {
    let schedules = await Schedule.find();

    let courses = null;
    let subjects = null;
    let terms = null;

    for (schedule of schedules) {
      courses = _.values(schedule.terms);
      subjects = _.map(courses, _.values);
      terms = _.flattenDeep(subjects);

      _.each(terms, (term) => {
        if (term.assigned && term.col === index) {
          term.assigned = false;
          term.row = null;
          term.col = null;
        } else if (term.assigned && term.col > index) {
          term.col -= 1;
        }
      });

      await Schedule.update({'id': schedule.id}, schedule);
    }
  },

  createTerms: async(course, subject) => {
    let schedules = await Schedule.find();

    const cellspan = Math.ceil(subject.duration / 15);

    for (schedule of schedules) {
      if (!_.has(schedule.terms, course.label)) {
        schedule.terms[course.label] = {};
      }

      schedule.terms[course.label][subject.label] = [];

      _.times(subject.lessons, (i) => {
        schedule.terms[course.label][subject.label].push({
          assigned: false,
          row: null,
          col: null,
          number: i,
          cellspan,
        });
      });

      await Schedule.update({'id': schedule.id}, schedule);
    }
  },

  removeTerms: async(course, subject) => {
    let schedules = await Schedule.find();

    for (schedule of schedules) {
      delete schedule.terms[course.label][subject.label];
      await Schedule.update({'id': schedule.id}, schedule);
    }
  }

};


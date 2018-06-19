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

    for (schedule of schedules) {
      _.each(_.values(schedule), (subject) => {
        _.each(_.values(subject), (term) => {
          if (term.col >= index) {
            term.col += 1;
          }
        });
      });
    }
  },

  shiftLeft: async (index) => {
    let schedules = await Schedule.find();

    for (schedule of schedules) {
      _.each(_.values(schedule), (subject) => {
        _.each(_.values(subject), (term) => {
          if (term.col >= index) {
            term.col -= 1;
          }
        });
      });
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
          course,
          subject,
          cellspan,
          number: i,
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


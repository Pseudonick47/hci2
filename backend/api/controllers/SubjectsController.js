/**
 * SubjectsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    let requestBody = req.body;
    let subject = await Subjects.create(requestBody).fetch();
    return res.json(subject);
  },

  // async find(req, res) {
  //   let subjects = await Subjects.find().populate('course');

  //   for (subject of subjects) {
  //     const courses = [];
  //     for (course of subject.course) {
  //       courses.push(await Courses.find(course.id));
  //     }
  //     subject.course = _.flatten(courses);
  //   }
  //   return res.json(subjects);
  // },
};


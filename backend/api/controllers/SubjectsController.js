/**
 * SubjectsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    let requestBody = req.body;
    const courses = requestBody.course;

    let subject = await Subjects.create(requestBody).fetch();

    let course = null;
    for (c of courses) {
      course = await Courses.findOne({'id': c});
      await Schedule.createTerms(course, subject);
    }

    subject = await Subjects.findOne({ id: req.param('id')}).populate('course');
    return res.json(subject);
  },

  async destroy(req, res) {
    const subject = await Subjects.findOne({ id: req.param('id')}).populate('course');

    for (course of subject.course) {
      await Schedule.removeTerms(course, subject);
    }

    await Subjects.destroy({ id: subject.id });

    return res.json(subject);
  }
};


/**
 * CoursesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    let requestBody = req.body;
    let course = await Courses.create(requestBody).fetch();
    return res.json(course);
  },

  async get(req, res) {
    let courses = await Courses.find();
    return res.json(courses);
  }
};


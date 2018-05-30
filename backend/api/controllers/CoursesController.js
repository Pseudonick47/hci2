import { courses } from "../../../frontend/src/store/modules";

/**
 * CoursesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // create: function(req,res){
  //   console.log('tu sam');
  //   let label = req.body.label;
  //   let title = req.body.title;
  //   let description = req.body.description;
  //   let date = req.body.date;

  //   let course = await Courses.create({label: label, title: title, description: description, date: date});
  //   res.json(course);
  // }
  async create(req, res) {
    let requestBody = req.body;
    let course = await Courses.create(requestBody).fetch();
    return res.json(course);
  }

};


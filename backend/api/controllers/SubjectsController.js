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
};


/**
 * ClassroomsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    let requestBody = req.body;
    let classroom = await Classrooms.create(requestBody).fetch();
    return res.json(classroom);
  }

};


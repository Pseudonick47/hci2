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

    // const numClassrooms = await Classrooms.count();
    // for(let i = 0; i < 6; i++) {
    //   await Schedule.shiftRight(i * numClassrooms + numClassrooms);
    // }

    return res.json(classroom);
  },

  // async delete(req, res) {
  //   let classroom = await Classrooms.findOne({ id: req.param('id') });

  //   const numClassrooms = await Classrooms.count();
  //   for(let i = 0; i < 6; i++) {
  //     await Schedule.leftRight(i * numClassrooms + numClassrooms);
  //   }

  //   await Classrooms.destroy({ id: classroom.id });

  //   return res.json(classroom);
  // },
};


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

    const classrooms = await Classrooms.find();
    const numClassrooms = classrooms.length;
    const index = _.findIndex(classrooms, 'id', classroom.id);

    for(let i = 0; i < 6; i++) {
      await Schedule.shiftRight(i * (numClassrooms - 1) + index);
    }

    classroom = await Classrooms.findOne({ id: classroom.id }).populate('software');
    return res.json(classroom);
  },

  async destroy(req, res) {
    let classroom = await Classrooms.findOne({ id: req.param('id') });

    const classrooms = await Classrooms.find();
    const numClassrooms = classrooms.length;
    const index = _.findIndex(classrooms, 'id', classroom.id);

    for(let i = 0; i < 6; i++) {
      await Schedule.shiftLeft(i * numClassrooms + index);
    }

    await Classrooms.destroy({ id: classroom.id });

    return res.json(classroom);
  },
};


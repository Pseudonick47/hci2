/**
 * ScheduleControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    let requestBody = req.body;
    let schedule = await Schedule.create(requestBody).fetch();
    return res.json(schedule);
  },

  async auto(req, res) {
    let schedule = await Schedule.findOne({ id: req.param('id') });
    try {
      await sails.helpers.autoScheduling(schedule);
    } catch(e) {
      const message = e.message.split('. ')[1].trim();
      return res.json('Could not automatically generate the schedule. ' + message);
    }

    return res.json(schedule);
  },

  async names(req, res) {
    let schedules = await Schedule.find();
    schedules = _.map(schedules, (s) => _.pick(s, ['id', 'name']));
    return res.json(schedules);
  }
};


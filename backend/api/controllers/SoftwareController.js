/**
 * SoftwareController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    let requestBody = req.body;
    let software = await Software.create(requestBody).fetch();
    return res.json(software);
  }

};


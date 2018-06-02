/**
 * Classrooms.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    label: { type: 'string', unique: true, required: true },
    software: { collection: 'software', via: 'classroom'}
  },  

};


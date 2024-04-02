'use strict';

const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        review: 'This was an awesome spot!',
        stars: 5
      },
      {
        review: 'Would come here again.',
        stars: 5
      },
      {
        review: 'How did this place get 5 star ratings before?! I had to worst experience!',
        stars: 1
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
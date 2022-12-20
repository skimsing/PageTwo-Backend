const dummyScores = require('../data/dummyScores');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('scores').del();
  //adds new data
  await knex('scores').insert(dummyScores);
};

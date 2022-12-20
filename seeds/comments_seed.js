const dummyComments = require('../data/dummyComments.js');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').del();
  //adds new data
  await knex('comments').insert(dummyComments);
};
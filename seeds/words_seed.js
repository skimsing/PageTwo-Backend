/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const dummyWords = require('../data/dummyWordBank');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('words').del();
  //adds new data
  await knex('words').insert(dummyWords);
};
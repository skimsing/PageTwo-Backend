/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const dummyUsers = require('../data/dummyUsers');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  //adds new data
  await knex('users').insert(dummyUsers);
};
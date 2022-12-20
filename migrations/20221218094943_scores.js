/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/

exports.up = function(knex) {
    return knex.schema.createTable('scores', function(table){
        table.string('id');
        table.integer('score').notNullable();
        table.string('name').notNullable();
        table.timestamp('playEndTime').defaultTo(knex.fn.now());
    });
 };
 
 exports.down = function(knex) {
  return knex.schema.dropTable('scores');
 };
 
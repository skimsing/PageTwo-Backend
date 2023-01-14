/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('comments', function(table){
        table.string('postId');
        table.string('userId');
        table.string('name').notNullable();
        table.longtext('comment').notNullable();
        // table.date('date').defaultTo(knex.fn.now);
        table.timestamp('date').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};
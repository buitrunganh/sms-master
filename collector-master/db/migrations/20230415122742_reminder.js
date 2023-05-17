/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.withSchema('public')
      .createTable('reminder', function(table) {
        table.increments('id');
        table.integer('from_user').references('id')
            .inTable('user').notNullable();
        table.integer('repeat').notNullable(); // number of reminder before inactive ? 
        table.integer('repeat_every').notNullable(); // interval between each reminder
        table.timestamp('start_on') // starting time for reminder
            .notNullable().defaultTo(knex.fn.now());
        table.integer('end_after_x_times_occurrences').notNullable().default(1); // number of re-send reminder if 
        table.timestamp('created_at')
            .notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at')
            .notNullable().defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('reminder');
};

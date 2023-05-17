/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.withSchema('public')
      .createTable('user', function(table) {
        table.increments();
        table.string('first_name').nullable();
        table.string('last_name').nullable();
        table.timestamp('birthday').nullable();
        table.string('phone_number').nullable();
        table.string('address').nullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
        table.unique('phone_number');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user');
};

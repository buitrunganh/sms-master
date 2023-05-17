/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.withSchema('public')
    .createTable('record', function(table) {
      table.increments();
      table.timestamp('created_at')
          .notNullable().defaultTo(knex.fn.now());
      table.jsonb('data').notNullable();
      table.bigint('user_id').references('id').inTable('user');
      table.integer('input_type').default(0);
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      // table.unique(['schema_id', 'created_at', 'section_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('record');
};

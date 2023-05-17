/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  let date = new Date();
  await knex('reminder').del()
  await knex('reminder').insert([
    {
      id: 100000,
      from_user: 1,
      repeat: 10,
      repeat_every: 1,
      start_on: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay(),
      end_after_x_times_occurrences: 5
  },
  {
      id: 100001,
      from_user: 2,
      repeat: 10,
      repeat_every: 1,
      start_on: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay(),
      end_after_x_times_occurrences: 5
  },
  ]);
};

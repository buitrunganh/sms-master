/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {
      first_name: 'Bui',
      last_name: 'Trung Anh',
      birthday: '1998-12-13',
      phone_number: 0936827349,
      address: 'Saigonres Nguyen Xi, Binh Thanh, TP HCM'
    },
    {
      first_name: 'Nguyen',
      last_name: 'Van A',
      birthday: '1993-07-25',
      phone_number: 0900000073,
      address: 'Saigonres Nguyen Xi, Binh Thanh, TP HCM'
    }
  ]);
};

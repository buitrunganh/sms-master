// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'collector_master',
      user:     'postgres',
      password: 'password',
      port: 5432,
      host: '127.0.0.1' 
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  // reminder_app: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'reminder_app',
  //     user:     'postgres',
  //     password: 'password',
  //     port: 5432,
  //     host: '127.0.0.1' 
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

};

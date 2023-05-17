const knex = require('knex');
const knexfile = require('./knexfile');

// TODO, due to each environment, use dependency injection to create knex instance so db access can be mocked for tests ???

// TODO in prod don't access knexfile.development directly but decide which environment for access
const db = knex(knexfile.development);
module.exports = db;
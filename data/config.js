const knex = require('knex'); //import knex
const knexfile = require('../knexfile'); //import the knex file


module.exports = knex(knexfile); //export knex
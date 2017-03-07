'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('movie', function(table){
      table.increments('id').primary();
      table.string('name');
    })
  ]);  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('movie')
  ]);
};
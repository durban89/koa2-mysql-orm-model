'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('animal', function(table) {
      table.increments('id').primary();
      table.integer('ownerId').unsigned().references('id').inTable('person')
      table.string('name');
      table.string('species')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knes.schema.dropTableIfExists('animal')
  ]);
};

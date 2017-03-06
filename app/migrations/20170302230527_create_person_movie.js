'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('person_movie', function(table){
      table.increments('id').primary();
      table.integer('personId').unsigned().references('id').inTable('person').onDelete('CASCADE');
      table.integer('movieId').unsigned().references('id').inTable('movie').onDelete('CASCADE');
    })
  ]); 
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('person_movie')
  ]);
};

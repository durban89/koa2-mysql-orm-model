exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('person_movie', (table) => {
      table.increments('id').primary();
      table.integer('personId')
        .unsigned()
        .references('id')
        .inTable('person')
        .onDelete('CASCADE');
      table.integer('movieId')
        .unsigned()
        .references('id')
        .inTable('movie')
        .onDelete('CASCADE');
    }),
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('person_movie'),
  ]);
};

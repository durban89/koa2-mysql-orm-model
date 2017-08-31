exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('movie', (table) => {
      table.increments('id').primary();
      table.string('name');
    }),
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('movie'),
  ]);
};

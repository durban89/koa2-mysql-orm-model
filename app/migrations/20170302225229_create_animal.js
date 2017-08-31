exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('animal', (table) => {
      table.increments('id').primary();
      table.integer('ownerId').unsigned().references('id').inTable('person');
      table.string('name');
      table.string('species');
    }),
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('animal'),
  ]);
};

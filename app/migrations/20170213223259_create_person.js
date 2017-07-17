

exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('person', (table) => {
      table.increments('id').primary();
      table.integer('parentId').unsigned().references('id').inTable('Person');
      table.string('firstName');
      table.string('lastName');
      table.integer('age');
      table.json('address');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('person'),
  ]);
};

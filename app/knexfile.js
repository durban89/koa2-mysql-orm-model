'use strict';

console.log(__dirname);

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: __dirname + '/example.db'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'example'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: __dirname + '/example.db'
    }
  }
}

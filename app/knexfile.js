'use strict';

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './example.db'
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
  }
}

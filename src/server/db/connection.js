const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'wine_cellar'
};

const db = pgp(cn);

module.exports = db;

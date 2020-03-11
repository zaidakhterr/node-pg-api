require('dotenv').config();

const { Pool } = require('pg');

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
};

const pool = new Pool(config);
pool
  .connect()
  .then(() => console.log('Database Connected ...'))
  .catch(err => console.error('Connection Error', err));

module.exports = {
  query: query => {
    const start = Date.now();
    return pool.query(query).then(result => {
      const duration = Date.now() - start;
      console.log('executed query', {
        text: query.text,
        duration,
        rows: result.rowCount,
      });
      return result;
    });
  },
};

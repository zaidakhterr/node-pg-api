require('dotenv').config();

const express = require('express');
const { Client } = require('pg');

const app = express();

// Middleware
app.use(express.json());

// DB Connection
const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  idleTimeoutMillis: 30000,
};
const client = new Client(config);
client
  .connect()
  .then(() => console.log('Database Connected ...'))
  .catch(err => console.error('Connection Error', err));

// Requests
// app.get('/users', (req, res) => {
//   client
//     .query('SELECT * from users')
//     .then(result => {
//       res.json(result);
//     })
//     .catch(err => {
//       res.status(400).json();
//       console.error(err);
//     });
// });

app.get('/users', async (req, res) => {
  try {
    const query = {
      text: 'SELECT name from users',
    };
    const result = await client.query(query);
    if (!result.rows.length) return res.status(404).json('not found');
    res.json(result.rows);
    console.log(result.rows);
  } catch ({ message }) {
    res.status(400).json({ message });
    console.error({ message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const query = {
      text: 'SELECT name from users WHERE id=$1',
      values: [req.params.id],
    };
    const result = await client.query(query);
    if (!result.rows.length) return res.status(404).json('not found');
    res.json(result.rows[0]);
    console.log(result.rows[0]);
  } catch ({ message }) {
    res.status(400).json({ message });
    console.error({ message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    const query = {
      text: 'INSERT INTO users(name) VALUES($1)',
      values: [name],
    };
    const result = await client.query(query);
    res.json(result);
    console.log({ name });
  } catch ({ message }) {
    res.status(400).json({ message });
    console.error({ message });
  }
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} ...`));

const router = require('express').Router();

const db = require('../db');

/*
  @route GET /users
  @description
   Gets names of all users
*/
router.get('/', (req, res) => {
  const query = {
    text: 'SELECT name FROM users',
  };
  db.query(query)
    .then(result => res.json(result.rows))
    .catch(({ message }) => {
      console.error({ message });
      res.status(400).json({ message });
    });
});

/*
  @route GET /users/:id
  @description
   Gets user of specific id
*/
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = {
    text: 'SELECT name FROM users where id = $1',
    values: [id],
  };
  db.query(query)
    .then(result => {
      if (!result.rows.length)
        res.status(404).json({ message: 'user not found' });
      res.json(result.rows[0]);
    })
    .catch(({ message }) => {
      console.error({ message });
      res.status(400).json({ message });
    });
});

/*
  @route POST /users
  @description
   Inserts a user into the database
*/
router.post('/', (req, res) => {
  const { name } = req.body;
  const query = {
    text: 'INSERT INTO users(name) VALUES($1)',
    values: [name],
  };
  db.query(query)
    .then(result => res.json({ name }))
    .catch(({ message }) => {
      console.error({ message });
      res.status(400).json({ message });
    });
});

module.exports = router;

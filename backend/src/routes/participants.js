const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

const dbConfig = {
  host: 'db-mysql',
  user: 'root',
  password: 'example',
  database: 'sports',
};

router.post('/', async (req, res) => {
  const { event, firstName, lastName } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      'INSERT INTO participants (event, firstName, lastName) VALUES (?, ?, ?)',
      [event, firstName, lastName]
    );
    await connection.end();
    res.status(201).send({ message: 'Participant registered!' });
    console.log('Participant registered!');
  } catch (err) {
    res.status(500).send({ error: 'Failed to register participant' });
    console.log('Failed to register participant');
  }
});

router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM participants');
    await connection.end();
    res.status(200).send(rows);
    console.log('Successfully fetched ')
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch participants' });
  }
});
module.exports = router;

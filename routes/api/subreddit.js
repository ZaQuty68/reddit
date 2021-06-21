const express = require("express");
const router = express.Router();
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
});

router.get('/', async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM subreddit");

    res.send(rows);
});

router.post('/', async (req, res) => {
    await pool.query(`INSERT INTO subreddit (name, description, user_id) VALUES
        ('${req.body.name}', '${req.body.description}', ${req.body.user_id} )`);
    res.status(201).send();
});

router.delete('/:id', async (req, res) => {
    await pool.query(`DELETE FROM subreddit WHERE id = ${req.params.id}`);
    res.status(200).send();
})

module.exports = router;
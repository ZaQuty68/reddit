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
    const { rows } = await pool.query("SELECT * FROM subreddit_user");

    res.send(rows);
});

router.post('/', async (req, res) => {
    await pool.query(`INSERT INTO subreddit_user (user_id, subreddit_id) VALUES
        (${req.body.user_id}, ${req.body.subreddit_id})`);
    res.status(201).send();
});

router.delete('/:id', async (req, res) => {
    await pool.query(`DELETE FROM subreddit_user WHERE id = ${req.params.id}`);
    res.status(200).send();
})

module.exports = router;
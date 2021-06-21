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
    const { rows } = await pool.query("SELECT * FROM comment");

    res.send(rows);
});

router.post('/', async (req, res) => {
    await pool.query(`INSERT INTO comment (content, user_id, post_id) VALUES
        ('${req.body.content}', ${req.body.user_id}, ${req.body.post_id})`);
    res.status(201).send();
});

router.delete('/:id', async (req, res) => {
    await pool.query(`DELETE FROM comment WHERE id = ${req.params.id}`);
    res.status(200).send();
})

module.exports = router;
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
    const { rows } = await pool.query("SELECT * FROM reddit_user");

    res.send(rows);
});

router.post('/', async (req, res) => {
    await pool.query(`INSERT INTO reddit_user (password, email) VALUES
        ('${req.body.password}', '${req.body.email}')`);
    res.status(201).send();
});

router.put('/:id', async (req, res) => {
    await pool.query(`UPDATE reddit_user SET password = '${req.body.password}' WHERE id = ${req.params.id}`);
    res.status(201).send();
})

router.delete('/:id', async (req, res) => {
    await pool.query(`DELETE FROM reddit_user WHERE id = ${req.params.id}`);
    res.status(200).send();
})

module.exports = router;
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
    const { rows } = await pool.query("SELECT * FROM post");

    res.send(rows);
});

router.post('/', async (req, res) => {
    await pool.query(`INSERT INTO post (title, content, image_path, video_url, creation_date, subreddit_id, user_id) VALUES
        ('${req.body.title}', '${req.body.content}', '${req.body.image_path}', '${req.body.video_url}', '${new Date()}', ${req.body.subreddit_id}, ${req.body.user_id})`);
    res.status(201).send();
});

router.delete('/:id', async (req, res) => {
    await pool.query(`DELETE FROM post WHERE id = ${req.params.id}`);
    res.status(200).send();
})

module.exports = router;
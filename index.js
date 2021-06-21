const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
// const passport = require('passport');
// const flash = require('express-flash');
// const session = require('express-session');
// require('dotenv').config();

// const initializePassport = require('./passport-config');
// initializePassport(passport);



app.use(express.json()).use(cors())
// app.use(flash()).use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// })).use(passport.initialize()).use(passport.session());

const subreddit = require("./routes/api/subreddit");
const post = require("./routes/api/post");
const comment = require("./routes/api/comment");
const redditUser = require("./routes/api/reddit_user");
const postVote = require("./routes/api/post_vote");
const subredditUser = require("./routes/api/subreddit_user");

app.use("/api/subreddit", subreddit);
app.use("/api/post", post);
app.use("/api/comment", comment);
app.use("/api/user", redditUser);
app.use("/api/postVote", postVote);
app.use("/api/subredditUser", subredditUser);

// app.post('/login', passport.authenticate('local', {
//     successRedirect: 'http://localhost:8080/',
//     failureRedirect: 'http://localhost:8080/login',
//     failureFlash: true
// }));

app.use((req, res) => {
    res.status(404).json({
        message: "Błąd: Podana strona nie istnieje!"
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
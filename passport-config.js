// const LocalStrategy = require('passport-local').Strategy

// const { Pool } = require('pg');

// const pool = new Pool({
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS
// });

// function initialize(passport){
//     const authenticateUser = (email, password, done) => {
//         pool.query(`SELECT * FROM reddit_user WHERE email = '${email}'`, (err, res) => {
//             if(err){
//                 throw err;
//             }
//             if(res.rows.length){
//                 const user = res.rows[0];
//                 if(password === user.password){
//                     return done(null, user)
//                 }
//                 else{
//                     return done(null, false, {message: "Password incorrect" })
//                 }
//             } else {
//                 return done(null, false, { message: "No user found" })
//             }
//         })
//     }
//     passport.use(new LocalStrategy({ usernameField: 'email' },
//     authenticateUser))
//     passport.serializeUser((user, done) => { })
//     passport.deserializeUser((id, done) => { })
// }

// module.exports = initialize
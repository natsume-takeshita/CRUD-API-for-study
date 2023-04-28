const express = require('express');
const app = express();
const ejs = require('ejs');
// const mysql = require('mysql');

// require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOSTNAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

const omusubilist = [
  ['しおむすび',100,'定番',10],
  ['焼きおにぎり',120,'定番',10],
  ['梅干し',150,'定番',10],
  ['昆布',150,'定番',10],
  ['鮭',200,'定番',10],
  ['ツナマヨ',200,'定番',10],
  ['たらこ',200,'定番',10],
  ['天むす',250,'期間限定',5],
  ['スパむすび',250,'期間限定',5],
  ['いくら',500,'期間限定',5],
];

const cart = []

// connection.connect((err) => {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('welcome.ejs');
});

app.get('/list', (req, res) => {
  res.render('list.ejs',{omusubilist:omusubilist});
});

app.get('/cart', (req, res) => {
  res.render('cart.ejs');
});


// app.get('/list', (req, res) => {
//   connection.query(
//     'SELECT * FROM omusubilist',
//     (error, results) => {
//       res.render('list.ejs', { omusubi: results });
//     }
//   );
// });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

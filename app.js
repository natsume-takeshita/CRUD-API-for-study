const express = require('express');
const app = express();
const ejs = require('ejs');

app.use(express.urlencoded({extended: false}));

const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect();

// const omusubilist = [
//   ['しおむすび',100,'定番',10],
//   ['焼きおにぎり',120,'定番',10],
//   ['梅干し',150,'定番',10],
//   ['昆布',150,'定番',10],
//   ['鮭',200,'定番',10],
//   ['ツナマヨ',200,'定番',10],
//   ['たらこ',200,'定番',10],
//   ['天むす',250,'期間限定',5],
//   ['スパむすび',250,'期間限定',5],
//   ['いくら',500,'期間限定',5],
// ];

// const cart = [
//   ['しおむすび',100,0],
//   ['焼きおにぎり',120,0],
//   ['梅干し',150,0],
//   ['昆布',150,0],
//   ['鮭',200,0],
//   ['ツナマヨ',200,0],
//   ['たらこ',200,0],
//   ['天むす',250,0],
//   ['スパむすび',250,0],
//   ['いくら',500,0],
// ]

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
  connection.execute(
    'SELECT * FROM omusubilist ORDER BY id',
    [],
    (error, results) => {
      res.render('list.ejs', { omusubilist: results });
    } 
  )
});

app.get('/cart', (req, res) => {
  connection.execute(
    'SELECT * FROM cart',
    [],
    (error, results) => {
      res.render('cart.ejs', { cart: results });
    } 
  )
});

// function addtocart(omusubi){
//   for (let i = 0;i<10;i++){
//     if (omusubi === cart[i][0]){
//       if (omusubilist[i][3]>0){
//         cart[i][2] += 1;
//         omusubilist[i][3]-=1; 
//       }
//     }
//   }
// }

// function deletefromCart(omusubi) {
//   for (let i = 0;i<10;i++){
//     if (omusubi === cart[i][0]){
//       if (cart[i][2] > 0){
//         cart[i][2] -= 1;
//         omusubilist[i][3]+=1;         
//       }
//     }
//   }
// }

// app.get('/cart', (req, res) => {
//   res.render('cart.ejs');
// });

app.post('/list', (req, res) => {
  const omusubi = req.body.buyingOmusubi;
  connection.query(
    'UPDATE omusubilist SET stock = stock-1 WHERE name = ?',
    [omusubi],
    (error, results) => {
    }
  )
  connection.query(
    'UPDATE cart SET number = number+1 WHERE name = ?',
    [omusubi],
    (error, results) => {
    }
  );
  res.redirect('/list');
});

app.post('/cart', (req, res) => {
  const omusubi = req.body.deletingOmusubi;
  connection.query(
    'SELECT number FROM cart where name = ?',
    [omusubi],
    (error, results) => {
      console.log(results[0].number,omusubi)
      connection.query(
        'UPDATE omusubilist SET stock = ?+stock WHERE name = ?',
        [results[0].number,omusubi],
        (error, results) => {
        }
        )
    }
  );
  connection.query(
    'UPDATE cart SET number = 0 WHERE name = ?',
    [omusubi],
    (error, results) => {
    }
  );
  res.redirect('/cart');
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

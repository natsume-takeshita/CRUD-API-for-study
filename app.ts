import express from 'express';
import path from 'node:path';
import ejs from 'ejs';
import mysql from 'mysql2';

export {};

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({extended: false}));
import 'dotenv/config'

const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect();

app.set('view engine', 'ejs');

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('welcome.ejs');
});

app.get('/list', (req: express.Request, res: express.Response) => {
  connection.execute(
    'SELECT * FROM omusubilist ORDER BY id',
    [],
    (error:any, results:any) => {
      res.render('list.ejs', { omusubilist: results });
    } 
  )
});

app.get('/cart', (req: express.Request, res: express.Response) => {
  connection.execute(
    'SELECT * FROM cart',
    [],
    (error:any, results:any) => {
      res.render('cart.ejs', { cart: results });
    } 
  )
});



app.post('/list', (req: express.Request, res: express.Response) => {
  const omusubi = req.body.buyingOmusubi;
  connection.query(
    'UPDATE omusubilist SET stock = stock-1 WHERE name = ?',
    [omusubi],
    (error:any, results:any) => {
    }
  )
  connection.query(
    'UPDATE cart SET number = number+1 WHERE name = ?',
    [omusubi],
    (error:any, results:any) => {
    }
  );
  res.redirect('/list');
});

app.post('/cart', (req: express.Request, res: express.Response) => {
  const omusubi = req.body.deletingOmusubi;
  connection.query(
    'SELECT number FROM cart where name = ?',
    [omusubi],
    (error:any, results:any) => {
      console.log(results[0].number,omusubi)
      connection.query(
        'UPDATE omusubilist SET stock = ?+stock WHERE name = ?',
        [results[0].number,omusubi],
        (error:any, results:any) => {
        }
        )
    }
  );
  connection.query(
    'UPDATE cart SET number = 0 WHERE name = ?',
    [omusubi],
    (error:any, results:any) => {
    }
  );
  res.redirect('/cart');
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});

const express = require('express');
const app = express();
const ejs = require('ejs');
const mysql = require('mysql');


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('list.ejs');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

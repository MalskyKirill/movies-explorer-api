const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// подключение к бд
mongoose
  .connect('mongodb://127.0.0.1:27017/moviesdb')
  .then(() => {
    console.log('подключение к базе данных проекта movies');
  });

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

//
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

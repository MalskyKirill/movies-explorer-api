const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routs/index');

// подключение к бд
mongoose
  .connect('mongodb://localhost:27017/moviesdb')
  // .connect('mongodb://127.0.0.1:27017/moviesdb')
  .then(() => {
    console.log('подключение к базе данных проекта movies');
  });

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6500543029775ccf13fa1335', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(router);

// начинаем прослушивать подключение на PORT
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

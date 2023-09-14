require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routs/index');
const { requestLogger, errorLogger } = require('./midlewares/logger');

const handleError = require('./midlewares/handleError');

// подключение к бд
mongoose
  // .connect('mongodb://localhost:27017/moviesdb')
  .connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log('подключение к базе данных проекта movies');
  });

const app = express();

app.use(cors()); // подключаем корс

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter); // промежуточное ПО для ограничения скорости ко всем запросам

app.use(helmet()); // промежуточное ПО для защиты заголовков

app.use(bodyParser.json()); // подключили бодипарсер

app.use(requestLogger); // подключаем логгер запросов

app.use(router); // подключаем роуты

app.use(errorLogger); // подключаем логгер ошибок

// обработчик ошибок celebrate
app.use(errors());

// мидлварина для обработки ошибок
app.use(handleError);

// начинаем прослушивать подключение на PORT
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

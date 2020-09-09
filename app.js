// подключение express
const express = require('express');
const path = require('path');
const cards = require('./routes/cards');
const users = require('./routes/users');
// создаем объект приложения
const app = express();
// начинаем прослушивать подключения на 3000 порту
const { PORT = 3000 } = process.env;
// подключаем доступ к публичной директории
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', cards);
app.use('/users', users);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

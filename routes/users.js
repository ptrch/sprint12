const routerUsers = require('express').Router();
const path = require('path');
const pathUsers = path.join(__dirname, '../data/users.json');

const promisesFs = require('fs').promises;

// routerUsers.get('/', (req, res) => {
//   res.send(users);
// });

routerUsers.get('/', (req, res) => {
  promisesFs.readFile(pathUsers, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      if (!users) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      } else {
        res.send(users);
      }
    })
    .catch((err) => {
      console.error(err.message);
      console.error('Что-то определенно сломалось');
      res.status(500).send({ message: 'Что-то определенно сломалось' });
    });
});

function getUser(id, users) {
  return users.find((evt) => evt._id === id);
}

routerUsers.get('/:id', (req, res) => {
  promisesFs.readFile(pathUsers, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      const findUser = getUser(req.params.id, users);
      if (findUser) {
        res.send(findUser);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => {
      console.error(err.message);
      console.error('Что-то определенно сломалось');
      res.status(500).send({ message: 'Что-то определенно сломалось' });
    });
});

module.exports = routerUsers;
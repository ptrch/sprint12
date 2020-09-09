/* eslint-disable no-console */
const path = require('path');

const pathUsers = path.join(__dirname, '../data/users.json');
const promisesFs = require('fs').promises;

const helpUsers = (req, res) => {
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
};

function getUser(id, users) {
  // eslint-disable-next-line no-underscore-dangle
  return users.find((evt) => evt._id === id);
}

const helpFindUsers = (req, res) => {
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
};

module.exports = {
  helpUsers,
  helpFindUsers
};
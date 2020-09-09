/* eslint-disable no-console */
const path = require('path');

const pathCards = path.join(__dirname, '../data/cards.json');
const promisesFs = require('fs').promises;

const helpCards = (req, res) => {
  promisesFs.readFile(pathCards, { encoding: 'utf8' })
    .then((data) => {
      const cards = JSON.parse(data);
      if (!cards) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      } else {
        res.send(cards);
      }
    })
    .catch((err) => {
      console.error(err.message);
      console.error('Что-то определенно сломалось');
      res.status(500).send({ message: 'Что-то определенно сломалось' });
    });
};

module.exports = helpCards;

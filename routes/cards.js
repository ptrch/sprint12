const routerCards = require('express').Router();
const helpCards = require('../helpers/helpersCards');

routerCards.get('/', helpCards);

module.exports = routerCards;

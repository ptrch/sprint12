const routerUsers = require('express').Router();
const { helpUsers, helpFindUsers } = require('../helpers/helpersUsers');

routerUsers.get('/', helpUsers);

routerUsers.get('/:id', helpFindUsers);
module.exports = routerUsers;

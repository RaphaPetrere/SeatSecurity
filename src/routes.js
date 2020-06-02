const express = require('express');
// const connection = require('./database/connection');
const UserController = require('./controllers/UserController');
const CartaoController = require('./controllers/CartaoController');
const LocaisController = require('./controllers/LocaisController');
const routes = express.Router();



routes.get('/users', UserController.get);
routes.post('/users', UserController.create);
routes.delete('/users/:id', UserController.delete);
routes.put('/users', UserController.update);

routes.get('/cartoes', CartaoController.list);
routes.post('/cartoes', CartaoController.create);
routes.delete('/cartoes/:numCartao', CartaoController.delete);

routes.get('/locais', LocaisController.list);



module.exports = routes;
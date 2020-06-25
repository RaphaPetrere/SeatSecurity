const express = require('express');
// const connection = require('./database/connection');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const CartaoController = require('./controllers/CartaoController');
const LocaisController = require('./controllers/LocaisController');
const ViagemController = require('./controllers/ViagemController');
const GerenciaController = require('./controllers/GerenciaController');
const UltimasController = require('./controllers/UltimasController');
const BookedController = require('./controllers/BookedController');

const routes = express.Router();

routes.post('/login', LoginController.post);

routes.post('/users', UserController.create);
routes.get('/users', UserController.get); //rota utilizada só pro desenvolvimento
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.post('/cartoes', CartaoController.create);
routes.get('/cartoes', CartaoController.list);
routes.delete('/cartoes/:numCartao', CartaoController.delete);

// routes.post('/locais', LocaisController.create); //rota utilizada só pro desenvolvimento
routes.post('/locais', LocaisController.list);
routes.put('/locais', LocaisController.update); //rota utilizada só pro desenvolvimento
routes.delete('/locais/:localId', LocaisController.delete); //rota utilizada só pro desenvolvimento

routes.post('/viagens', ViagemController.create);
routes.get('/viagens', ViagemController.list);
routes.delete('/viagens/:viagemId', ViagemController.delete);

routes.post('/relatorio', GerenciaController.list);

routes.get('/ultimasViagens', UltimasController.list);
routes.post('/booked', BookedController.list);

module.exports = routes;
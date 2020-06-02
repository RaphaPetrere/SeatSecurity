const express = require('express');
const connection = require('./database/connection');
const UserController = require('./controllers/UserController');
const routes = express.Router();



routes.get('/users', UserController.list);
routes.post('/users', UserController.get);
routes.post('/users', UserController.create);
routes.delete('/users/:id', UserController.delete);
routes.put('/users', UserController.update);



module.exports = routes;
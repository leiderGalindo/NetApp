'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/user/:id', UserController.getUser);
api.post('/user', UserController.saveUser);
api.post('/userEmail', UserController.sendMailer);

module.exports = api;
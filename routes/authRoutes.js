const express = require('express');
const Router = express.Router();

const {register, login, logout} = require('../controllers/authController');

Router.post('/register', register);
Router.get('/login', login);
Router.post('/logout', logout);

module.exports = Router;
const express = require('express');
const route = express.Router();
let controller = require('../Controller/controller')

route.get('/',controller.login);
// route.get('/loginuser',controller.register_user);
route.get('/registeruser',controller.registeruser);

route.post('/registeruser', controller.register_user);
route.post('/loginuser',controller.home_page);

module.exports = route;
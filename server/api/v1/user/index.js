var express = require('express');
var controller = require('./user.controller');
var router = express.Router();
module.exports = router;

router.get('/users', controller.getUsers);
router.post('/create-user', controller.createUser);
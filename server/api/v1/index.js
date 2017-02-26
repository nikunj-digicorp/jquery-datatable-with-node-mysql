var express = require('express');
var router = express.Router();
module.exports = router;

router.use('/user', require('./user'));
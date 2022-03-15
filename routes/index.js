const express = require('express');
const router = express.Router();
const user = require('./user');
const category = require('./category');
const blog = require('./blog');
const authorization = require('../middlewares/authorization');

router.use('/', user);
router.use('/', category);
router.use(authorization);
router.use('/', blog);

module.exports = router;

const express = require('express');
const CategoryContoller = require('../controllers/categoryController');
const router = express.Router();

router.post('/create_category', CategoryContoller.createCategory);
router.get('/get_category', CategoryContoller.getAllCategory);

module.exports = router;

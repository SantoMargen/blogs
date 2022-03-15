const express = require('express');
const BlogController = require('../controllers/blogContoller');
const router = express.Router();

router.get('/get_blogs', BlogController.getAllBlog);
router.post('/post_blogs', BlogController.createBlog);

module.exports = router;

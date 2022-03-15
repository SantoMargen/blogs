const Blog = require('../models/blog');

class BlogController {
  static async createBlog(req, res, next) {
    try {
      const { tittle, disc, category_id } = req.body;
      const allBlogs = await Blog.find();
      let id = 0;
      if (allBlogs.length === 0) {
        id = 1;
      } else {
        const lastBlog = allBlogs[allBlogs.length - 1];
        id = lastBlog.id += 1;
      }
      const payload = {
        id: id,
        tittle,
        disc,
        category_id,
        users_id: req.user._id,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await Blog.create(payload);
      res.status(201).json({ status: 1, message: 'success' });
    } catch (err) {
      next(err);
    }
  }

  static async getAllBlog(req, res, next) {
    try {
      const allBlogs = await Blog.find()
        .populate('category_id', ['name'])
        .populate('users_id', ['id']);
      let arrayData = [];
      allBlogs.forEach((el) => {
        let data = {};
        data.id = el.id;
        data.tittle = el.tittle;
        data.disc = el.disc;
        data.category = el.category_id.name;
        data.user_id = el.users_id.id;
        arrayData.push(data);
      });
      res.status(200).json({
        status: 1,
        message: 'success',
        data: { arrayData },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BlogController;

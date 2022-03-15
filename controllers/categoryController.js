const Category = require('../models/category');

class CategoryContoller {
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      let id = 0;
      const allCategory = await Category.find();
      if (allCategory.length === 0) {
        id = 1;
      } else {
        const lastCategory = allCategory[allCategory.length - 1];
        id = lastCategory.id += 1;
      }

      const payload = {
        id,
        name,
        created_at: new Date(),
        updated_at: new Date(),
      };
      await Category.create(payload);
      res.status(201).json({
        status: 1,
        message: 'success',
      });
    } catch (err) {
      next(err);
    }
  }
  static async getAllCategory(req, res, next) {
    try {
      const allCategories = await Category.find().select(['id', 'name']);
      res.status(200).json({
        status: 1,
        message: 'success',
        data: { allCategories },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryContoller;

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'id is required'],
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'category_id is required'],
  },
  users_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'users_id is required'],
  },
  tittle: {
    type: String,
    required: [true, 'tittle is required'],
  },
  disc: {
    type: String,
    required: [true, 'disc is required'],
  },
  created_at: {
    type: Date,
    required: [true, 'created_at is required'],
  },
  updated_at: {
    type: Date,
    required: [true, 'updated_at is required'],
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

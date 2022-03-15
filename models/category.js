const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'id is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
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

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

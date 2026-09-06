const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
      minlength: [1, 'Title cannot be empty'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: {
        values: [
          'Fiction',
          'Non-Fiction',
          'Science',
          'Technology',
          'History',
          'Biography',
          'Self-Help',
          'Fantasy',
          'Mystery',
          'Romance',
          'Horror',
          'Philosophy',
          'Art',
          'Other',
        ],
        message: '{VALUE} is not a valid category',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['Available', 'Issued'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Available',
    },
  },
  { timestamps: true }
);

// Index for search performance
bookSchema.index({ title: 'text', author: 'text' });

module.exports = mongoose.model('Book', bookSchema);

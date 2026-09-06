const { validationResult } = require('express-validator');
const Book = require('../models/Book');

// GET /api/books — returns ALL books (shared library)
const getBooks = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (status && status !== 'All') {
      filter.status = status;
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json({ books, total: books.length });
  } catch (err) {
    console.error('Get books error:', err);
    res.status(500).json({ message: 'Failed to fetch books.' });
  }
};

// POST /api/books — any authenticated user can add to shared library
const createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { title, author, category, status } = req.body;

  try {
    const book = await Book.create({
      title,
      author,
      category,
      status: status || 'Available',
    });

    res.status(201).json({ message: 'Book added successfully', book });
  } catch (err) {
    console.error('Create book error:', err);
    res.status(500).json({ message: 'Failed to add book.' });
  }
};

// PUT /api/books/:id — any authenticated user can edit any shared book
const updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    const { title, author, category, status } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.category = category || book.category;
    book.status = status || book.status;

    await book.save();
    res.json({ message: 'Book updated successfully', book });
  } catch (err) {
    console.error('Update book error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid book ID.' });
    }
    res.status(500).json({ message: 'Failed to update book.' });
  }
};

// DELETE /api/books/:id — any authenticated user can delete any shared book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Delete book error:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid book ID.' });
    }
    res.status(500).json({ message: 'Failed to delete book.' });
  }
};

module.exports = { getBooks, createBook, updateBook, deleteBook };

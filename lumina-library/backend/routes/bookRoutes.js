const express = require('express');
const { body } = require('express-validator');
const { getBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const bookValidation = [
  body('title').trim().notEmpty().withMessage('Book title is required'),
  body('author').trim().notEmpty().withMessage('Author name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
];

router.use(protect);

router.get('/', getBooks);
router.post('/', bookValidation, createBook);
router.put('/:id', bookValidation, updateBook);
router.delete('/:id', deleteBook);

module.exports = router;

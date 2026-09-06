import { useState, useEffect } from 'react';

const CATEGORIES = [
  'Fiction', 'Non-Fiction', 'Science', 'Technology', 'History',
  'Biography', 'Self-Help', 'Fantasy', 'Mystery', 'Romance',
  'Horror', 'Philosophy', 'Art', 'Other',
];

const EMPTY = { title: '', author: '', category: '', status: 'Available' };

export default function BookModal({ isOpen, onClose, onSubmit, book, loading }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const isEdit = !!book;

  useEffect(() => {
    if (book) {
      setForm({ title: book.title, author: book.author, category: book.category, status: book.status });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [book, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.author.trim()) e.author = 'Author is required';
    if (!form.category) e.category = 'Category is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: '' }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">{isEdit ? 'Edit Book' : 'Add New Book'}</div>
            <div className="modal-subtitle">{isEdit ? 'Update book information' : 'Add a book to your library'}</div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="book-title">Book Title *</label>
              <input id="book-title" className="form-input" placeholder="Enter book title" value={form.title} onChange={set('title')} />
              {errors.title && <div className="form-error">⚠ {errors.title}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="book-author">Author *</label>
              <input id="book-author" className="form-input" placeholder="Enter author name" value={form.author} onChange={set('author')} />
              {errors.author && <div className="form-error">⚠ {errors.author}</div>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="book-category">Category *</label>
              <select id="book-category" className="form-select" value={form.category} onChange={set('category')}>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <div className="form-error">⚠ {errors.category}</div>}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="book-status">Status</label>
              <select id="book-status" className="form-select" value={form.status} onChange={set('status')}>
                <option value="Available">Available</option>
                <option value="Issued">Issued</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <><span className="spinner" /> Saving...</> : (isEdit ? 'Update Book' : 'Add Book')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

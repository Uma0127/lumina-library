import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { getBooks, createBook, updateBook, deleteBook } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('lumina_user') || '{}');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    try {
      const { data } = await getBooks();
      setBooks(data.books);
    } catch {
      toast.error('Failed to load books.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  const stats = {
    total: books.length,
    available: books.filter((b) => b.status === 'Available').length,
    issued: books.filter((b) => b.status === 'Issued').length,
    categories: new Set(books.map((b) => b.category)).size,
  };

  const recentBooks = books.slice(0, 6);

  const handleAddBook = async (form) => {
    setModalLoading(true);
    try {
      const { data } = await createBook(form);
      setBooks((p) => [data.book, ...p]);
      setModalOpen(false);
      toast.success('Book added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add book.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleEditBook = async (form) => {
    setModalLoading(true);
    try {
      const { data } = await updateBook(editBook._id, form);
      setBooks((p) => p.map((b) => (b._id === editBook._id ? data.book : b)));
      setEditBook(null);
      setModalOpen(false);
      toast.success('Book updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update book.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteBook(deleteTarget._id);
      setBooks((p) => p.filter((b) => b._id !== deleteTarget._id));
      setDeleteTarget(null);
      toast.success('Book deleted.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete book.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const openAdd = () => { setEditBook(null); setModalOpen(true); };
  const openEdit = (book) => { setEditBook(book); setModalOpen(true); };

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAddBook={openAdd}
        user={user}
      />

      <div className="main-content">
        <Navbar onMenuClick={() => setSidebarOpen(true)} user={user} />

        <div className="page-content">
          <div className="greeting-section">
            <div className="greeting-text">
              {new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 18 ? 'Good Afternoon' : 'Good Evening'}, {user?.name?.split(' ')[0] || 'User'} 👋
            </div>
            <div className="greeting-sub">Here's what's happening in your library today.</div>
          </div>

          <div className="stats-grid">
            <StatsCard icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>} label="Total Books" value={stats.total} color="#6366f1" bg="rgba(99,102,241,0.15)" />
            <StatsCard icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>} label="Available" value={stats.available} color="#10b981" bg="rgba(16,185,129,0.15)" />
            <StatsCard icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} label="Issued" value={stats.issued} color="#f59e0b" bg="rgba(245,158,11,0.15)" />
            <StatsCard icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>} label="Categories" value={stats.categories} color="#06b6d4" bg="rgba(6,182,212,0.15)" />
          </div>

          <div className="section-header">
            <div className="section-title">Recent Books</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => navigate('/books')}>View All</button>
              <button className="btn btn-primary btn-sm" onClick={openAdd}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Add Book
              </button>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner size="lg" text="Loading your library..." />
          ) : recentBooks.length === 0 ? (
            <EmptyState
              icon="📚"
              title="Your library is empty"
              text="Start building your library by adding your first book."
              action={{ label: 'Add Your First Book', onClick: openAdd }}
            />
          ) : (
            <div className="books-grid">
              {recentBooks.map((book) => (
                <BookCard key={book._id} book={book} onEdit={openEdit} onDelete={setDeleteTarget} />
              ))}
            </div>
          )}
        </div>
      </div>

      <BookModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditBook(null); }}
        onSubmit={editBook ? handleEditBook : handleAddBook}
        book={editBook}
        loading={modalLoading}
      />

      {deleteTarget && (
        <div className="modal-overlay">
          <div className="modal confirm-dialog">
            <div className="modal-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <div className="confirm-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </div>
              <div className="confirm-title">Delete Book?</div>
              <div className="confirm-text">
                Are you sure you want to delete <strong style={{ color: 'var(--text)' }}>"{deleteTarget.title}"</strong>? This action cannot be undone.
              </div>
            </div>
            <div className="modal-footer" style={{ justifyContent: 'center', gap: 12 }}>
              <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)} disabled={deleteLoading}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDelete} disabled={deleteLoading}>
                {deleteLoading ? <><span className="spinner" /> Deleting...</> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

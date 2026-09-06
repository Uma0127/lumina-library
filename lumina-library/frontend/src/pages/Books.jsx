import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { getBooks, createBook, updateBook, deleteBook } from '../services/api';

export default function Books() {
  const user = JSON.parse(localStorage.getItem('lumina_user') || '{}');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category !== 'All') params.category = category;
      if (status !== 'All') params.status = status;
      const { data } = await getBooks(params);
      setBooks(data.books);
    } catch {
      toast.error('Failed to load books.');
    } finally {
      setLoading(false);
    }
  }, [search, category, status]);

  useEffect(() => {
    const timer = setTimeout(fetchBooks, 300);
    return () => clearTimeout(timer);
  }, [fetchBooks]);

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
  const isFiltered = search || category !== 'All' || status !== 'All';

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onAddBook={openAdd} user={user} />

      <div className="main-content">
        <Navbar title="Books Collection" subtitle="Manage your entire library" onMenuClick={() => setSidebarOpen(true)} user={user} />

        <div className="page-content">
          <div className="page-header">
            <div>
              <div className="page-title">Books Collection</div>
              <div className="page-subtitle">Browse, search and manage all your books</div>
            </div>
            <button className="btn btn-primary" onClick={openAdd}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add New Book
            </button>
          </div>

          <SearchBar
            search={search} onSearch={setSearch}
            category={category} onCategory={setCategory}
            status={status} onStatus={setStatus}
          />

          {loading ? (
            <LoadingSpinner size="lg" text="Loading books..." />
          ) : books.length === 0 ? (
            isFiltered ? (
              <EmptyState
                icon="🔍"
                title="No matching books found"
                text="Try adjusting your search or filters to find what you're looking for."
                action={{ label: 'Clear Filters', onClick: () => { setSearch(''); setCategory('All'); setStatus('All'); } }}
              />
            ) : (
              <EmptyState
                icon="📚"
                title="No books yet"
                text="Start building your library by adding your first book."
                action={{ label: 'Add Your First Book', onClick: openAdd }}
              />
            )
          ) : (
            <>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 16 }}>
                Showing {books.length} book{books.length !== 1 ? 's' : ''}
              </div>
              <div className="books-grid">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} onEdit={openEdit} onDelete={setDeleteTarget} />
                ))}
              </div>
            </>
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
            <div className="modal-footer" style={{ justifyContent: 'center' }}>
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

export default function BookCard({ book, onEdit, onDelete }) {
  const isAvailable = book.status === 'Available';

  return (
    <div className="book-card">
      <div className="book-card-header">
        <div className="book-icon">📖</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="book-title" title={book.title}>{book.title}</div>
          <div className="book-author">by {book.author}</div>
        </div>
      </div>

      <div className="book-meta">
        <span className="badge badge-category">{book.category}</span>
        <span className={`badge ${isAvailable ? 'badge-available' : 'badge-issued'}`}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
          {book.status}
        </span>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 'auto' }}>
        Added {new Date(book.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </div>

      <div className="book-actions">
        <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => onEdit(book)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={() => onDelete(book)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6"/><path d="M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

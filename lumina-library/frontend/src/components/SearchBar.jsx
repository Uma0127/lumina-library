const CATEGORIES = [
  'All', 'Fiction', 'Non-Fiction', 'Science', 'Technology',
  'History', 'Biography', 'Self-Help', 'Fantasy', 'Mystery',
  'Romance', 'Horror', 'Philosophy', 'Art', 'Other',
];

export default function SearchBar({ search, onSearch, category, onCategory, status, onStatus }) {
  return (
    <div className="search-filter-bar">
      <div className="search-wrapper">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <select className="filter-select" value={category} onChange={(e) => onCategory(e.target.value)}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
        ))}
      </select>

      <select className="filter-select" value={status} onChange={(e) => onStatus(e.target.value)}>
        <option value="All">All Status</option>
        <option value="Available">Available</option>
        <option value="Issued">Issued</option>
      </select>
    </div>
  );
}

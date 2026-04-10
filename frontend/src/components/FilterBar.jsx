export default function FilterBar({ tags, activeTag, onSelect }) {
  return (
    <div className="filter-section">
      <div className="filter-label">Filter by technology</div>
      <div className="filter-bar">
        <button
          className={`filter-chip all-chip ${activeTag === null ? 'active' : ''}`}
          onClick={() => onSelect(null)}
        >
          All
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            className={`filter-chip ${activeTag === tag ? 'active' : ''}`}
            onClick={() => onSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

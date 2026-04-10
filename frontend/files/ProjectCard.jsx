function formatDate(isoString) {
  if (!isoString) return null
  const d = new Date(isoString)
  // Guard against invalid date strings that parse to NaN
  if (isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ProjectCard({ project, activeTag, onTagClick }) {
  const {
    display_name,
    elevator_pitch,
    problem_and_solution,
    tech_stack = [],
    highlight,
    url,
    stars,
    updated_at,
  } = project

  const formattedDate = formatDate(updated_at)

  return (
    <article className="project-card">
      {/* Top row: highlight badge + stars */}
      <div className="card-top">
        {highlight && <span className="card-highlight">{highlight}</span>}
        {stars > 0 && (
          <span className="card-stars">
            <span className="star-icon">★</span>
            {stars.toLocaleString()}
          </span>
        )}
      </div>

      {/* Project name */}
      <h2 className="card-name">{display_name}</h2>

      {/* Elevator pitch */}
      {elevator_pitch && (
        <p className="card-pitch">{elevator_pitch}</p>
      )}

      {/* Problem & Solution (truncated) */}
      {problem_and_solution && (
        <p className="card-body">{problem_and_solution}</p>
      )}

      {/* Tech stack tags */}
      {tech_stack.length > 0 && (
        <div className="card-tech">
          {tech_stack.map(tech => (
            <button
              key={tech}
              className={`tech-tag ${activeTag === tech ? 'highlighted' : ''}`}
              onClick={() => onTagClick(tech)}
              title={`Filter by ${tech}`}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      {/* Footer: updated date + link */}
      <div className="card-footer">
        <span className="card-updated">
          {formattedDate ? `Updated ${formattedDate}` : ''}
        </span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="card-link"
          >
            View repo →
          </a>
        )}
      </div>
    </article>
  )
}

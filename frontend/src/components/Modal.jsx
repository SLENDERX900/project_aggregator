import { useState } from 'react'

export default function Modal({ project, onClose, onTagClick }) {
  const {
    name,
    display_name,
    elevator_pitch,
    problem_and_solution,
    tech_stack = [],
    highlight,
    url,
    homepage,
    stars,
    updated_at,
  } = project

  const [previewLoaded, setPreviewLoaded] = useState(false)
  const [previewError, setPreviewError]   = useState(false)

  // Build iframe URL - add ?embed=true for Streamlit apps to prevent redirect loops
  const getIframeUrl = (url) => {
    if (!url) return url
    if (url.includes('streamlit.app')) {
      // Add ?embed=true parameter for Streamlit embedding
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}embed=true`
    }
    return url
  }
  
  const iframeUrl = getIframeUrl(homepage)

  const formattedDate = updated_at
    ? new Date(updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null

  return (
    /* Backdrop */
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-panel"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${display_name} detail`}
      >
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* ── Left column: project details ── */}
        <div className="modal-content">
          <div className="modal-header">
            {highlight && <span className="card-highlight">{highlight}</span>}
            {stars > 0 && (
              <span className="card-stars" style={{ marginLeft: 'auto' }}>
                <span className="star-icon">★</span> {stars.toLocaleString()}
              </span>
            )}
          </div>

          <h2 className="modal-title">{display_name}</h2>

          {elevator_pitch && (
            <p className="modal-pitch">{elevator_pitch}</p>
          )}

          <div className="modal-section-label">About</div>
          <p className="modal-body">
            {problem_and_solution || 'No description available.'}
          </p>

          {tech_stack.length > 0 && (
            <>
              <div className="modal-section-label">Tech stack</div>
              <div className="card-tech">
                {tech_stack.map(tech => (
                  <button
                    key={tech}
                    className="tech-tag"
                    onClick={() => onTagClick(tech)}
                    title={`Filter by ${tech}`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </>
          )}

          {formattedDate && (
            <p className="modal-meta">Last updated {formattedDate}</p>
          )}

          {/* Action links */}
          <div className="modal-actions">
            {url && (
              <a href={url} target="_blank" rel="noreferrer" className="modal-btn modal-btn-outline">
                View on GitHub →
              </a>
            )}
            {homepage && (
              <a href={homepage} target="_blank" rel="noreferrer" className="modal-btn modal-btn-primary">
                Open live site →
              </a>
            )}
          </div>
        </div>

        {/* ── Right column: live site preview ── */}
        <div className="modal-preview">
          {homepage ? (
            <>
              <div className="preview-bar">
                <span className="preview-url">{homepage}</span>
              </div>
              {!previewError ? (
                <>
                  {!previewLoaded && (
                    <div className="preview-loading">
                      <div className="loader" />
                      <p>Loading sneak peek…</p>
                    </div>
                  )}
                  <iframe
                    src={iframeUrl}
                    title={`Live preview of ${display_name}`}
                    className="preview-iframe"
                    style={{ opacity: previewLoaded ? 1 : 0 }}
                    onLoad={() => setPreviewLoaded(true)}
                    onError={() => setPreviewError(true)}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </>
              ) : (
                <div className="sneak-peek-placeholder">
                  <div className="sneak-peek-icon">👁️</div>
                  <p className="sneak-peek-title">Sneak Peek Unavailable</p>
                  <p className="sneak-peek-desc">
                    This site blocks iframe embedding for security.
                    <br />Click below to visit the live app.
                  </p>
                  <a href={homepage} target="_blank" rel="noreferrer" className="modal-btn modal-btn-primary">
                    Open Live Site →
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="preview-blocked">
              <p>No live site linked</p>
              <small>Add a website URL in your GitHub repo settings to enable preview</small>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

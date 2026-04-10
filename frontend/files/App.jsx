import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header.jsx'
import FilterBar from './components/FilterBar.jsx'
import ProjectCard from './components/ProjectCard.jsx'

// ─── Derive GitHub username from first project URL ─────────────
function extractUsername(projects) {
  const url = projects?.[0]?.url || ''
  const match = url.match(/github\.com\/([^/]+)\//)
  return match ? match[1] : null
}

// ─── Build sorted tag list from all projects ───────────────────
function buildTagList(projects) {
  const freq = {}
  for (const p of projects) {
    for (const tech of p.tech_stack || []) {
      freq[tech] = (freq[tech] || 0) + 1
    }
  }
  // Sort by frequency descending, then alphabetically
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag)
}

// ─── App ────────────────────────────────────────────────────────
export default function App() {
  const [projects, setProjects]   = useState([])
  const [status, setStatus]       = useState('loading') // 'loading' | 'error' | 'ready'
  const [errorMsg, setErrorMsg]   = useState('')
  const [activeTag, setActiveTag] = useState(null)

  // Load portfolio data
  useEffect(() => {
    // Use BASE_URL so the path works whether the app is deployed to / or /repo-name/
    const dataUrl = `${import.meta.env.BASE_URL}portfolio_ready.json`
    fetch(dataUrl)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        // Sort: stars desc, then by updated_at desc
        const sorted = [...data].sort((a, b) => {
          if (b.stars !== a.stars) return b.stars - a.stars
          return new Date(b.updated_at) - new Date(a.updated_at)
        })
        setProjects(sorted)
        setStatus('ready')
      })
      .catch(err => {
        setErrorMsg(err.message)
        setStatus('error')
      })
  }, [])

  const tags     = useMemo(() => buildTagList(projects), [projects])
  const username = useMemo(() => extractUsername(projects), [projects])

  const filtered = useMemo(() => {
    if (!activeTag) return projects
    return projects.filter(p =>
      (p.tech_stack || []).some(t => t === activeTag)
    )
  }, [projects, activeTag])

  // When clicking a tag on a card — toggle if same, otherwise set
  const handleTagClick = (tag) => {
    setActiveTag(prev => prev === tag ? null : tag)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Render states ──────────────────────────────────────────────
  if (status === 'loading') {
    return (
      <div className="page-shell">
        <div className="status-screen">
          <div className="loader" />
          <p>Loading portfolio …</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="page-shell">
        <div className="status-screen">
          <p style={{ color: 'var(--text-secondary)' }}>
            Could not load portfolio_ready.json
          </p>
          <p style={{ fontSize: '11px' }}>{errorMsg}</p>
          <p style={{ fontSize: '11px', marginTop: '8px' }}>
            Make sure the file is in the <code style={{ color: 'var(--accent)' }}>public/</code> folder
            and you have run <code style={{ color: 'var(--accent)' }}>refiner.py</code> first.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <Header totalCount={projects.length} username={username} />

      <FilterBar
        tags={tags}
        activeTag={activeTag}
        onSelect={setActiveTag}
      />

      <div className="results-bar">
        <span className="results-count">
          Showing <span>{filtered.length}</span> of {projects.length} projects
          {activeTag && <> tagged <em style={{ fontStyle:'normal', color:'var(--accent)' }}>{activeTag}</em></>}
        </span>
        {activeTag && (
          <button
            className="filter-chip"
            style={{ fontSize:'10px', padding:'3px 10px' }}
            onClick={() => setActiveTag(null)}
          >
            ✕ clear filter
          </button>
        )}
      </div>

      <main>
        <div className="projects-grid" key={activeTag}>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>No projects found</p>
              <small>Try a different filter tag</small>
            </div>
          ) : (
            filtered.map(project => (
              <ProjectCard
                key={project.name}
                project={project}
                activeTag={activeTag}
                onTagClick={handleTagClick}
              />
            ))
          )}
        </div>
      </main>

      <footer className="site-footer">
        <span className="footer-text">
          Built with the{' '}
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub API</a>
          {' '}& Gemini 1.5 Flash
        </span>
        <span className="footer-text">
          {projects.length} repos · automated portfolio
        </span>
      </footer>
    </div>
  )
}

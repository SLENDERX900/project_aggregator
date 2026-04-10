export default function Header({ totalCount, username, lastUpdated }) {
  const now = new Date()
  const formatted = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

  return (
    <header className="site-header">
      <div className="header-eyebrow">Open Source Work</div>
      <h1 className="header-title">
        Built with<br />
        <em>intention.</em>
      </h1>
      <p className="header-sub">
        A curated selection of projects — from quick tools to production systems.
        Filter by technology to find what&apos;s relevant to you.
      </p>
      <div className="header-meta">
        <div>{totalCount} projects</div>
        <div>Updated {formatted}</div>
        {lastUpdated && (
          <div style={{ color: 'var(--accent-dim)' }}>
            Live · {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
        {username && (
          <div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--accent-dim)', textDecoration: 'none' }}
            >
              github.com/{username}
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

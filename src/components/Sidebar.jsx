import React from 'react'
import styles from './Sidebar.module.css'

function ProgressBar({ value, gradient }) {
  return (
    <div className={styles.bar}>
      <div
        className={styles.fill}
        style={{ width: `${value}%`, background: gradient }}
      />
    </div>
  )
}

export default function Sidebar({ score, tipsCount }) {
  const avg = score ? Math.round((score.desk + score.folder) / 2) : null

  return (
    <aside className={styles.sidebar}>
      {/* Score card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span>📊</span>
          <h3>Organization Score</h3>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statValue} style={{ color: 'var(--accent)' }}>
              {avg !== null ? `${avg}` : '—'}
            </div>
            <div className={styles.statLabel}>Score /100</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue} style={{ color: 'var(--accent2)' }}>
              {tipsCount}
            </div>
            <div className={styles.statLabel}>Tips Given</div>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressLabel}>
            <span>Desktop Cleanliness</span>
            <span>{score ? `${score.desk}%` : '—'}</span>
          </div>
          <ProgressBar
            value={score?.desk ?? 0}
            gradient="linear-gradient(90deg, var(--accent), var(--accent3))"
          />

          <div className={styles.progressLabel}>
            <span>Folder Structure</span>
            <span>{score ? `${score.folder}%` : '—'}</span>
          </div>
          <ProgressBar
            value={score?.folder ?? 0}
            gradient="linear-gradient(90deg, var(--accent2), var(--accent))"
          />
        </div>
      </div>

      {/* Tips card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span>💡</span>
          <h3>Pro Tips</h3>
        </div>
        <ul className={styles.tips}>
          <li>Keep your desktop to <strong>≤ 10 items</strong></li>
          <li>Use folders, not the desktop, as storage</li>
          <li>Prefix files with dates: <code>2025-01-report.pdf</code></li>
          <li>Clean downloads every <strong>Friday</strong></li>
          <li>Use <strong>_INBOX</strong> folder for unsorted files</li>
        </ul>
      </div>
    </aside>
  )
}

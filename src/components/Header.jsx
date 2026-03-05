import React from 'react'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoMark}>🗂️</div>
      <div className={styles.logoText}>
        <h1>DeskMind</h1>
        <span>AI Desktop Organizer</span>
      </div>
      <div className={styles.statusBadge}>
        <div className={styles.statusDot} />
        Online
      </div>
    </header>
  )
}

import React from 'react'
import Header from './components/Header'
import ChatPanel from './components/ChatPanel'
import Sidebar from './components/Sidebar'
import { useChat } from './utils/useChat'
import styles from './App.module.css'

export default function App() {
  const { messages, isLoading, score, tipsCount, send } = useChat()

  return (
    <div className={styles.app}>
      {/* Ambient glows */}
      <div className={`${styles.glow} ${styles.glowOne}`} />
      <div className={`${styles.glow} ${styles.glowTwo}`} />

      <div className={styles.inner}>
        <Header />

        <main className={styles.grid}>
          <ChatPanel messages={messages} isLoading={isLoading} onSend={send} />
          <Sidebar score={score} tipsCount={tipsCount} />
        </main>
      </div>
    </div>
  )
}

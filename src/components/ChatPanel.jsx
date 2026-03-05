import React, { useRef, useEffect, useState } from 'react'
import styles from './ChatPanel.module.css'

const SUGGESTIONS = [
  'My desktop is a mess 😅',
  'How to organize Downloads?',
  'Best folder structure for work',
  'File naming conventions',
]

const QUICK_ACTIONS = [
  { icon: '🗄️', label: 'Full Organization Plan', text: 'Give me a complete desktop organization system' },
  { icon: '📥', label: 'Fix Downloads Folder',   text: 'How should I organize my Downloads folder?' },
  { icon: '🧹', label: 'Clean Up Space',          text: 'What files can I safely delete to free up space?' },
  { icon: '🏷️', label: 'Naming Conventions',     text: 'Give me a file naming convention system' },
  { icon: '✅', label: 'Stay Organized',          text: 'How to maintain a clean desktop long-term?' },
]

function Message({ msg }) {
  const isAI = msg.role === 'ai'
  return (
    <div className={`${styles.msg} ${isAI ? styles.ai : styles.user}`}>
      <div className={styles.avatar}>{isAI ? '🤖' : '👤'}</div>
      <div>
        <div
          className={styles.bubble}
          dangerouslySetInnerHTML={{
            __html: msg.text
              .replace(/\n/g, '<br>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
          }}
        />
        <div className={styles.time}>{msg.time}</div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className={`${styles.msg} ${styles.ai}`}>
      <div className={styles.avatar}>🤖</div>
      <div className={styles.bubble}>
        <div className={styles.typing}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}

export default function ChatPanel({ messages, isLoading, onSend }) {
  const [input, setInput] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const windowRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (windowRef.current) {
      windowRef.current.scrollTop = windowRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    setShowSuggestions(false)
    onSend(input.trim())
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const autoResize = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const useSuggestion = (text) => {
    setShowSuggestions(false)
    onSend(text)
  }

  return (
    <div className={styles.panel}>
      {/* Panel header */}
      <div className={styles.panelHeader}>
        <span>💬</span>
        <h2>Assistant</h2>
      </div>

      {/* Quick actions */}
      <div className={styles.quickActions}>
        {QUICK_ACTIONS.map((qa) => (
          <button key={qa.label} className={styles.qaBtn} onClick={() => useSuggestion(qa.text)}>
            <span>{qa.icon}</span> {qa.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className={styles.window} ref={windowRef}>
        <Message
          msg={{
            role: 'ai',
            text: "Hey! I'm **DeskMind**, your personal desktop organizer. 🗂️\n\nTell me about your current setup and I'll give you a personalized plan!",
            time: 'Now',
          }}
        />
        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        {isLoading && <TypingIndicator />}
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className={styles.suggestions}>
          {SUGGESTIONS.map((s) => (
            <button key={s} className={styles.chip} onClick={() => useSuggestion(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className={styles.inputArea}>
        <textarea
          ref={textareaRef}
          className={styles.input}
          placeholder="Describe your desktop situation..."
          rows={1}
          value={input}
          onChange={(e) => { setInput(e.target.value); autoResize(e) }}
          onKeyDown={handleKey}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
        >
          ↑
        </button>
      </div>
    </div>
  )
}

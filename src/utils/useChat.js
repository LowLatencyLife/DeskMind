import { useState, useCallback } from 'react'
import { sendToAI, parseScore, cleanReply } from '../utils/anthropic'

export function useChat() {
  const [messages, setMessages] = useState([])          // { role, text, time }
  const [history, setHistory] = useState([])             // raw API history
  const [isLoading, setIsLoading] = useState(false)
  const [score, setScore] = useState(null)               // { desk, folder } | null
  const [tipsCount, setTipsCount] = useState(0)
  const [error, setError] = useState(null)

  const getTime = () =>
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  const send = useCallback(async (userText) => {
    if (!userText.trim() || isLoading) return

    const userMsg = { role: 'user', text: userText, time: getTime() }
    setMessages((prev) => [...prev, userMsg])

    const newHistory = [...history, { role: 'user', content: userText }]
    setHistory(newHistory)
    setIsLoading(true)
    setError(null)

    try {
      const reply = await sendToAI(newHistory)
      const displayText = cleanReply(reply)
      const parsed = parseScore(reply)

      if (parsed) setScore(parsed)

      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: displayText, time: getTime() },
      ])
      setHistory((prev) => [...prev, { role: 'assistant', content: reply }])
      setTipsCount((n) => n + 1)
    } catch (err) {
      setError(err.message)
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: '⚠️ Could not reach the AI. Check your API key in `.env` and try again.',
          time: getTime(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [history, isLoading])

  return { messages, isLoading, score, tipsCount, error, send }
}

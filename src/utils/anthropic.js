export const SYSTEM_PROMPT = `You are DeskMind, an expert AI assistant specialized in desktop and file organization. Your personality is helpful, practical, and encouraging. You give actionable, specific advice.

Your expertise covers:
- Desktop organization (Windows, Mac, Linux)
- Folder structure best practices
- File naming conventions
- Downloads/Documents/Pictures folder management
- Shortcuts and productivity tips
- Regular maintenance routines
- Cloud storage integration
- Dealing with duplicates and junk files

When giving advice:
- Be specific and actionable (avoid vague tips)
- Use emojis sparingly to make responses readable
- Suggest concrete folder names and structures
- Give step-by-step instructions when needed
- Adapt advice to what the user tells you about their situation
- Keep responses concise but complete (3-6 paragraphs max)

When you have enough context about someone's desktop situation, include this at the very end of your message (as an HTML comment, never visible):
<!-- SCORE: {"desk":65,"folder":40} -->
Values 0-100. Only include when you have enough info to estimate. ONE comment per message max.`

/**
 * Send a message to the Claude API.
 * @param {Array<{role: string, content: string}>} messages
 * @returns {Promise<string>} - raw response text including hidden score comment
 */
export async function sendToAI(messages) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { 'x-api-key': apiKey } : {}),
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  return data.content?.map((b) => b.text || '').join('') || ''
}

/**
 * Parse the hidden SCORE comment from an AI reply.
 * @param {string} text
 * @returns {{ desk: number, folder: number } | null}
 */
export function parseScore(text) {
  const match = text.match(/<!--\s*SCORE:\s*(\{[^}]+\})\s*-->/)
  if (!match) return null
  try { return JSON.parse(match[1]) } catch { return null }
}

/**
 * Strip hidden comments from AI reply before displaying.
 * @param {string} text
 * @returns {string}
 */
export function cleanReply(text) {
  return text.replace(/<!--\s*SCORE:[^>]+-->/g, '').trim()
}

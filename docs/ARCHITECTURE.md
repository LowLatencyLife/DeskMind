# 🏗️ DeskMind — Architecture

## Overview

DeskMind is a single-page React application that communicates directly with the Anthropic Messages API to provide desktop organization advice.

---

## Component Tree

```
App
├── Header             — Logo + status badge
├── ChatPanel          — Main interaction area
│   ├── Quick Actions  — Horizontal pill buttons
│   ├── Message List   — AI + user bubbles
│   ├── Suggestions    — Starter chips (hidden after first use)
│   └── Input Area     — Textarea + send button
└── Sidebar
    ├── Score Card     — Dynamic desk/folder scores
    └── Pro Tips       — Static best-practice list
```

---

## Data Flow

```
User types message
       ↓
ChatPanel calls onSend(text)
       ↓
useChat hook appends user msg → calls sendToAI(history)
       ↓
anthropic.js → POST /v1/messages (Claude Sonnet)
       ↓
Raw reply → parseScore() extracts hidden JSON comment
          → cleanReply() strips comment for display
       ↓
useChat updates messages + score state
       ↓
React re-renders ChatPanel (new bubble) + Sidebar (score bars)
```

---

## Key Files

| File | Responsibility |
|------|---------------|
| `src/utils/anthropic.js` | API fetch, system prompt, score parsing |
| `src/utils/useChat.js`   | All chat state, loading, error handling |
| `src/components/ChatPanel.jsx` | UI for messages, input, quick actions |
| `src/components/Sidebar.jsx`   | Score display + static tips |
| `src/styles/global.css`        | CSS variables, keyframes |

---

## Scoring System

The AI is instructed via the system prompt to optionally embed a hidden HTML comment at the end of its reply:

```
<!-- SCORE: {"desk":72,"folder":55} -->
```

`parseScore()` extracts this with a regex. The comment is stripped before display via `cleanReply()`. The Sidebar animates progress bars to the new values via CSS transitions.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_ANTHROPIC_API_KEY` | Yes (for local dev) | Anthropic API key |

In production, route API calls through a backend proxy to avoid exposing the key client-side.

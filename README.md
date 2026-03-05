# 🗂️ DeskMind — AI Desktop Organizer

An AI-powered web app that helps you organize your desktop, folders, and files using Claude AI.

## ✨ Features

- 💬 **AI Chat** — Personalized organization advice powered by Claude
- ⚡ **Quick Actions** — One-click prompts for common tasks
- 📊 **Organization Score** — Dynamic scoring of your desktop cleanliness
- 🏷️ **Naming Conventions** — Best practices for file naming
- 🧹 **Cleanup Guidance** — What to delete, what to keep

## 🚀 Deploy on GitHub Pages

1. Fork or clone this repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)`
4. Visit `https://yourusername.github.io/deskmind`

## 🔑 API Key Setup

This app calls the Anthropic API directly from the browser.  
To use it locally or in production, you need to handle authentication.

> **Note:** For a production deployment, route API calls through a backend server to keep your API key secure. Do **not** expose your key in client-side code.

## 🗂️ Project Structure

```
deskmind/
├── index.html       # Main app (single-file)
└── README.md        # This file
```

## 🛠️ Tech Stack

- Vanilla HTML / CSS / JavaScript
- [Claude API](https://docs.anthropic.com) (claude-sonnet-4)
- Google Fonts (Syne, DM Mono, Instrument Serif)

## 📄 License

MIT — free to use and modify.

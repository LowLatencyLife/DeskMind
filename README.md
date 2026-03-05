# 🗂️ DeskMind — AI Desktop Organizer

An AI-powered web app that helps you organize your desktop, folders, and files using Claude AI.

![DeskMind Screenshot](docs/screenshot.png)

## ✨ Features

- 💬 **AI Chat** — Personalized organization advice powered by Claude Sonnet
- ⚡ **Quick Actions** — One-click prompts for common tasks
- 📊 **Organization Score** — Dynamic scoring of your desktop & folder structure
- 🏷️ **Naming Conventions** — Best practices for file naming
- 🧹 **Cleanup Guidance** — What to delete, what to keep
- 💡 **Pro Tips** — Always-visible static tips sidebar

## 🗂️ Project Structure

```
deskmind/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top nav bar
│   │   ├── Header.module.css
│   │   ├── ChatPanel.jsx       # Main AI chat UI
│   │   ├── ChatPanel.module.css
│   │   ├── Sidebar.jsx         # Score + tips panel
│   │   └── Sidebar.module.css
│   ├── utils/
│   │   ├── anthropic.js        # API calls + helpers
│   │   └── useChat.js          # Chat state hook
│   ├── styles/
│   │   └── global.css          # CSS variables & animations
│   ├── App.jsx
│   ├── App.module.css
│   └── main.jsx
├── docs/
│   └── ARCHITECTURE.md
├── index.html
├── vite.config.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/yourusername/deskmind.git
cd deskmind
npm install
```

### 2. Set up your API key

```bash
cp .env.example .env
# Edit .env and add your Anthropic API key
```

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Get your key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Build for production

```bash
npm run build
# Output in /dist
```

## 🌐 Deploy on GitHub Pages

1. Push repo to GitHub
2. Go to **Settings → Pages → Source: GitHub Actions**
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

> ⚠️ **Security note:** For production, proxy API calls through a backend (e.g. Vercel Edge Function, Cloudflare Worker) to avoid exposing your API key in the client.

## 🛠️ Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Framework   | React 18 + Vite               |
| Styling     | CSS Modules + CSS Variables   |
| AI          | Anthropic Claude Sonnet API   |
| Fonts       | Syne, DM Mono, Instrument Serif |
| Deploy      | GitHub Pages / Vercel         |

## 📄 License

MIT — free to use, fork, and modify.

# ✈️ SkyVoyage - Flight Booking System

A full-stack flight booking web application built with **React 18, Vite, TypeScript, Tailwind CSS**, and a **Node.js SQLite API backend**.

---

## 🚀 Quick Start (Easiest Way)

### On Windows:
Double-click either:
- **`run.bat`** (or **`start.bat`**)

This single file will:
1. Check that Node.js is installed.
2. Install any missing npm packages automatically.
3. Start the SQLite backend API (`http://localhost:4000`).
4. Start the React/Vite frontend (`http://localhost:5173`).
5. Open your default web browser directly to the app.

---

## 💻 Manual Start (Terminal)

### 1. Install dependencies (one time):
```bash
npm install
```

### 2. Start both Frontend & Backend with a single command:
```bash
npm start
```
*(or `npm run dev`)*

Your browser will automatically open to `http://localhost:5173`.

---

## 🛠️ Available npm Commands

| Command | Description |
|---|---|
| `npm start` | **Recommended:** Runs both backend API and frontend dev server together, then opens browser |
| `npm run dev` | Alias for `npm start` |
| `npm run dev:frontend` | Runs only the Vite React frontend on port 5173 |
| `npm run server` | Runs only the SQLite backend API on port 4000 |
| `npm run build` | Compiles TypeScript and builds the production bundle in `dist/` |
| `npm test` | Runs the automated booking, airport lookup, fare calculation & validation test suite |
| `npm run preview` | Previews the production build locally |

---

## 📋 Requirements
- **Node.js v22.5+** (uses the built-in `node:sqlite` module)
- **npm** (comes bundled with Node.js)

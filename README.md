# 💖 Malak × Salma Universe

A beautiful, interactive friendship website dedicated to Malak and Salma—a celebration of their 5-year friendship filled with chaos, healing, laughter, and emotional support.

## Features ✨

### 🔐 Security
- Password-protected access (Password: "Love you bestie")
- All data stored safely and locally in your browser

### 💬 Chat & Communication
- Private chat with message timestamps
- Voice message capability (reads typed messages aloud)
- Clear chat history option

### 💌 Memory Vault
- Save special messages or quotes from Malak or Salma
- Timestamps for every saved memory
- Persistent storage using browser localStorage

### 🎮 Games
- ♟️ **Chess**: Play against a bot or with another person
  - Full chess rules implementation with clean piece tracking
  - Move validation highlights
  - Click to select pieces, click valid squares to move
- 🎮 **Tic Tac Toe**: Two-player game with win/score tracking
  - Keep track of wins across multiple games
  - Instant game reset

### 🌈 Theme System
- 5 beautiful color themes matching any vibe:
  - 💖 Girly (Default) - Pink & Purple
  - 🌊 Ocean - Blue & Teal
  - 🌅 Sunset - Orange & Red
  - 🌲 Forest - Green
  - 🌙 Midnight - Purple & Dark
- Smooth theme transitions and saves your preference instantly

### ✨ Visual Effects
- Falling hearts and emojis animation
- Dynamic sparkle effects on interactions
- Glassmorphism UI design with elegant backdrop blur
- Responsive layout optimized for mobile and desktop screens

### 🎵 Audio
- Uplifting acoustic background music (with autoplay fallback)
- Voice synthesis text-to-speech engine

---

## How to Use

1. **Access the Site**: Open `index.html` in any web browser.
2. **Login**: Enter the password `"Love you bestie"`.
3. **Navigate**: Explore different features through the glassmorphism modules.
4. **Switch Themes**: Use the quick buttons in the top-right corner.
5. **Games**:
   - *Chess*: Click a piece to select it, then click one of the highlighted squares to move.
   - *Tic Tac Toe*: Click open cells to compete against each other.
6. **Save Memories**: Enter the author's name (Malak/Salma) and type a message to lock it into the Vault.

---

## Data Storage
All data is stored locally in your browser using `localStorage`. This includes:
- Private chat history
- Memory vault inputs
- Active color theme selection

Data persists between sessions so you won't lose your memories when you refresh or close the tab, unless you clear your browser data.

---

## Technical Stack
- **HTML5**: Content structure
- **CSS3**: Layout and animations using CSS variables for theme rendering
- **Vanilla JavaScript**: Independent application logic
- **Web APIs**: localStorage, Web Speech API, DOM Animations

---

## Customization

### Change the Site Password
Edit `script.js` around line 9:
```javascript
if (p === "Love you bestie") {

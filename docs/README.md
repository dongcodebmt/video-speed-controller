**English** | [Tiếng Việt](README_VI.md)

# 🎬 Video Speed Controller

A lightweight script that lets you **adjust HTML5 video playback speed** on any website using keyboard shortcuts.

## ✨ Features

- ⏩ Increase/decrease video speed with `D` / `S` keys
- 🔁 Reset speed to default (1.0x) with the `R` key
- 💾 **Automatically saves** the current playback speed to `localStorage`
- 📺 **Displays current speed** as an overlay on top of each video
- 🌐 Works on **any website** using `<video>` — YouTube, Facebook, etc.

## ⌨️ Keyboard Shortcuts

| Key | Action               |
|-----|----------------------|
| `D` | Increase speed by 0.5x |
| `S` | Decrease speed by 0.5x |
| `R` | Reset speed to 1.0x  |

> ⚠️ Shortcuts are disabled when typing inside inputs or textareas.

## 🧠 Persistent Speed Memory

- Every speed change is **saved to localStorage**
- When the page reloads, the saved speed is **automatically restored** for all videos

## 🖼 On-Video Overlay

- A small overlay appears in the **top-right corner of the website**
- Displays current speed and **fades out after 2 seconds**

## 🛠 Installation

1. Install the [ScriptCat](https://docs.scriptcat.org/) or [Tampermonkey ](https://www.tampermonkey.net/) browser extension
2. Create a new userscript
3. Paste the code from [script.user.js](https://raw.githubusercontent.com/dongcodebmt/video-speed-controller/main/script.user.js)
4. Save and enjoy!

## ✅ Compatible With

- YouTube
- Facebook
- Any custom video player using the `<video>` tag

## 📄 License

MIT License – Free to use and modify. Credit appreciated but not required 💖

---

### © 2025 - Script by dongcodebmt ✨

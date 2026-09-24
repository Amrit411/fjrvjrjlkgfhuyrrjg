# 🏛️ Mythos Atlas — Digital Encyclopedia of World Mythologies

An interactive digital archive and comparative mythological atlas celebrating ancient deities, legendary beasts, cosmic pantheons, and timeless sagas from seven global traditions: **Indian (Vedic/Hindu)**, **Greek**, **Norse**, **Egyptian**, **Japanese (Shinto)**, **Celtic**, and **Mesoamerican**.

![Mythos Atlas Banner](https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop)

---

## ✨ Features

- **Atlas Explorer**: Filter and search through 35+ mythological deities and legendary creatures by culture, domain, elemental affinities, and power ratings.
- **Genealogical Pantheons**: Interactive family trees for Mount Olympus, Asgard, and more.
- **Mythological Bestiary**: Specialized profiles for legendary creatures (Phoenix, Garuda, Kitsune, Kraken, Fenrir, Medusa, etc.) with abilities, lore, and weaknesses.
- **Comparative Timeline**: Cross-cultural historical eras and literary sources (from the Rigveda and Homeric Epics to the Eddas and Book of the Dead).
- **Oracle of Chance**: Serendipitous discovery engine with animated randomized cards.
- **Fast Fuzzy Search**: Instant keyboard shortcut (`Ctrl+K` or `Cmd+K`) search across names, lore, symbols, and elements.
- **High-Definition Visuals**: Built-in authentic, high-resolution imagery for every god and creature.
- **24 Local Character Portraits**: Dedicated high-resolution character portraits stored in `public/assets/portraits/` (`shiva.png`, `zeus.png`, `odin.png`, etc.) ensuring rapid offline loading and static hosting compatibility with GitHub Pages.

---

## 🎨 Character Portraits Directory (`public/assets/portraits/`)

All character portraits are cleanly organized in `public/assets/portraits/`. You can customize or replace any character's portrait simply by placing an image with the corresponding filename:

| Character Name | Category | Filename |
|---|---|---|
| **Lord Shiva** | Indian Deity | `shiva.png` |
| **Zeus** | Greek Deity | `zeus.png` |
| **Odin** | Norse Deity | `odin.png` |
| **Ra** | Egyptian Deity | `ra.png` |
| **Amaterasu** | Japanese Deity | `amaterasu.png` |
| **Medusa** | Greek Mythical Creature | `medusa.png` |
| **Fenrir** | Norse Mythical Beast | `fenrir.png` |
| **Anubis** | Egyptian Deity | `anubis.png` |
| **Garuda** | Indian Divine Beast | `garuda.png` |
| **Quetzalcoatl** | Mesoamerican Deity | `quetzalcoatl.png` |
| **Thor** | Norse Deity | `thor.png` |
| **Kitsune** | Japanese Mythical Fox | `kitsune.png` |
| **Lord Vishnu** | Indian Deity | `vishnu.png` |
| **Poseidon** | Greek Deity | `poseidon.png` |
| **Hades** | Greek Deity | `hades.png` |
| **Athena** | Greek Deity | `athena.png` |
| **Loki** | Norse Deity | `loki.png` |
| **Osiris** | Egyptian Deity | `osiris.png` |
| **Dragon** | Legendary Beast | `dragon.png` |
| **Phoenix** | Immortal Firebird | `phoenix.png` |
| **Kraken** | Oceanic Leviathan | `kraken.png` |
| **Cerberus** | Underworld Guardian | `cerberus.png` |
| **Susanoo** | Japanese Storm Deity | `susanoo.png` |
| **The Morrígan** | Celtic War Goddess | `morrigan.png` |

---

## 🚀 Quick Start (Local Setup)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/mythos-atlas.git
   cd mythos-atlas
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist` directory.

---

## 🌐 How to Deploy on GitHub Pages (Fix for White Screen)

A **white screen** on GitHub Pages happens when GitHub serves raw source files instead of running the Vite build. Here are the **2 easiest ways** to fix it:

### Method 1: Automatic GitHub Actions (Recommended — Zero commands)
This repository already includes `.github/workflows/deploy.yml`!
1. Go to your GitHub repository.
2. Click **Settings** (top tab) ➔ **Pages** (in the left sidebar).
3. Under **Build and deployment** ➔ **Source**, change the dropdown from **"Deploy from a branch"** to **"GitHub Actions"**.
4. Push your code or go to the **Actions** tab and click **Run workflow**.
5. Done! GitHub will automatically compile the Vite bundle and deploy your site in ~1 minute.

---

### Method 2: 1-Command Deploy via `gh-pages`
If you prefer running a command locally:
```bash
npm run deploy
```
This builds the project and pushes the compiled `dist` folder to a `gh-pages` branch on GitHub. Then in **Settings** ➔ **Pages**, select branch `gh-pages` ➔ `/ (root)`.

---

## ⚡ Deploy to Vercel or Netlify

- **Vercel**: Import your GitHub repo in Vercel. Framework preset will automatically detect `Vite`. Click **Deploy**.
- **Netlify**: Connect repository, set build command to `npm run build`, and publish directory to `dist`.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Typography**: Cinzel (ancient serif), Plus Jakarta Sans, JetBrains Mono

---

## 📜 License

MIT License — free for educational, personal, and commercial exploration.

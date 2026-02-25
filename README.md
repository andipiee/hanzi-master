# Hanzi Master

A premium, interactive Mandarin Chinese vocabulary study tool built with **Next.js** and **TypeScript**. Covers both **HSK 2.0** (6 levels) and **HSK 3.0** (9 levels) standards with pronunciation audio powered by the Web Speech API.

## ✨ Features

- **Dual HSK Standards** — Browse both HSK 2.0 (classic 6 levels) and HSK 3.0 (new 9-level framework) in one app.
- **Global Navigation Bar** — A sticky, glassmorphism-styled navbar lets you instantly switch between HSK versions.
- **Interactive Flashcards** — Click any vocabulary card to reveal the Pinyin and English translation with a smooth animation.
- **Pronunciation Audio** — Each card plays the Mandarin pronunciation using the browser's built-in Web Speech API (`zh-CN`).
- **Statically Generated** — All 20 routes are statically pre-rendered at build time for instant page loads.
- **Modern Design** — Dark mode support, gradient typography, smooth micro-animations, and responsive grid layout.

## 📚 Vocabulary Coverage

| Standard | Levels | Total Words |
|----------|--------|-------------|
| HSK 2.0  | 1–6    | ~5,000      |
| HSK 3.0  | 1–7 (covering 1–9) | ~11,000 |

## 🗂 Routing

| URL | Description |
|-----|-------------|
| `/` | Landing page — choose HSK 2.0 or HSK 3.0 |
| `/hsk2` | HSK 2.0 level selector (Levels 1–6) |
| `/hsk2/[level]` | Vocabulary cards for a specific HSK 2.0 level |
| `/hsk3` | HSK 3.0 level selector (Levels 1–9) |
| `/hsk3/[level]` | Vocabulary cards for a specific HSK 3.0 level |

## 🛠 Built With

- [Next.js 14](https://nextjs.org/) — App Router with Static Site Generation (SSG)
- [React 18](https://reactjs.org/) — Client components for interactivity
- [TypeScript](https://www.typescriptlang.org/) — Full type safety
- Vanilla CSS with Custom Properties — Premium design system, no Tailwind
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) — Native browser TTS for pronunciation

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/andipiee/mandarin-vocabularies.git
   cd mandarin-vocabularies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser and start studying!

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 📄 License

Open source, free to use for learning purposes.

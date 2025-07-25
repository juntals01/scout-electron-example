# Scout Electron Example

This project is a **React + TypeScript + Vite + Tailwind CSS** application wrapped in **Electron**, using **Yarn 4 (Stable)** for dependency management and development.

---

## 🧰 Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Electron](https://www.electronjs.org/)
- [Yarn (v4+)](https://yarnpkg.com/)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/juntals01/scout-electron-example.git
cd scout-electron-example
```

### 2. Install dependencies

```bash
yarn install
```

> ⚠️ This project uses Yarn 4 with Plug'n'Play (PnP). You will not see a `node_modules/` folder.

### 3. Set up environment variables

```bash
cp .env.local.example .env.local
```

### 4. Download Whisper Model

Whisper CLI requires a model file to run speech-to-text. Since the model is >100MB, it’s not tracked in Git.

```bash
mkdir -p public/whisper
curl -L -o public/whisper/ggml-base.en.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin
```

---

## 💻 Running the App (Development)

```bash
yarn dev
```

---

## 🎨 Using ShadCN UI

```bash
npx shadcn@latest add button
```

> Make sure your `tsconfig.json` has the `@/*` path alias mapped to `src/*`.

---

## 📦 Build for Production

```bash
yarn build
```

---

## 🛠️ Create App Distributions

Electron Builder will package the app for your platform.

### macOS (ARM64 M1/M2)

```bash
yarn dist:mac
```

### Windows (x64)

```bash
yarn dist:win
```

### Linux (x64)

```bash
yarn dist:linux
```

---

## 📁 Folder Structure

```
src/
  ├─ electron/         # Electron main process
  └─ ui/               # React frontend
dist-react/            # Vite build output
dist-electron/         # Electron build output (tsc)
dist/                  # Final packaged app
```

---

## 🧑‍💻 Author

Built by [@juntals01](https://github.com/juntals01)

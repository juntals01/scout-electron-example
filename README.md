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

Use **Yarn Stable**:

```bash
yarn install
```

> ⚠️ This project uses Yarn 4 with Plug'n'Play (PnP). You will not see a `node_modules/` folder.

---

## 💻 Running the App (Development)

In **two separate terminals**, run:

### Terminal 1 — Start Vite React frontend

```bash
yarn dev:react
```

### Terminal 2 — Start Electron app

```bash
yarn dev:electron
```

Electron will load the compiled Vite output from `dist-react/index.html`.

---

## 📦 Build for Production

```bash
yarn build
```

This will compile both the Electron backend (`tsconfig.electron.json`) and the Vite frontend into production output.

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

> These commands run:
>
> - `yarn transpile:electron` – compiles Electron backend
> - `yarn build` – builds the Vite React frontend
> - `electron-builder` – packages the final app

---

## 📁 Folder Structure

```
src/
  ├─ electron/         # Electron main process
  └─ ui/               # React frontend
dist-react/            # Vite build output
dist-electron/         # Electron build output (tsc)
dist/                  # build installer output
```

---

## 🧑‍💻 Author

Built by [@juntals01](https://github.com/juntals01)

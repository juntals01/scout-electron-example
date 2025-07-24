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

## 💻 Running the App

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

This will compile both TypeScript and your Vite app.

---

## 🧹 ESLint Configuration (Optional)

To enable type-aware and React-specific lint rules, you can use the following config:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

---

## 📁 Folder Structure

```
src/
  ├─ electron/         # Electron main process
  └─ ui/               # React frontend
dist-react/            # Vite build output
```

---

## 🧑‍💻 Author

Built by [@juntals01](https://github.com/juntals01)

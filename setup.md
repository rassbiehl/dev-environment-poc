1. Create frontend (React + TypeScript + Vite)
   Fra repository root:
   npm create vite@latest frontend -- --template react-ts
   cd frontend
   npm install
   npm install tailwindcss @tailwindcss/vite
   npm install -D prettier
   cd ..

Vite React + TypeScript-templaten inkluderer normalt ESLint.

Konfigurér frontend/vite.config.ts:
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
plugins: [react(), tailwindcss()],
});

Tilføj i frontend/src/index.css:
@import 'tailwindcss';

2. Create backend (Node.js + TypeScript)
   Fra repository root:
   mkdir backend
   cd backend
   npm init -y
   npm install -D typescript @types/node
   npm install -D eslint @eslint/js typescript-eslint globals
   npm install -D prettier
   npx tsc --init
   cd ..

npm install genererer automatisk package-lock.json. Derfor er dit tidligere trin med npm install --package-lock-only overflødigt. 3. Configure backend ESLint
Opret backend/eslint.config.mjs:
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
{
ignores: ['dist/**', 'coverage/**'],
},
js.configs.recommended,
...tseslint.configs.recommended,
{
files: ['**/*.{js,mjs,ts}'],
languageOptions: {
globals: globals.node,
},
},
);

Tilføj følgende scripts i backend/package.json:
{
"scripts": {
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"format": "prettier --write .",
"format:check": "prettier --check ."
}
}

Behold øvrige eksisterende scripts.

Tilføj også format og format:check til frontend/package.json. Frontend har normalt allerede et lint script. 4. Configure Prettier
Opret én fælles .prettierrc.json i repository root:
{
"semi": true,
"singleQuote": true,
"trailingComma": "all",
"tabWidth": 2,
"printWidth": 100
}

Opret .prettierignore i root:
**/node_modules/
**/dist/
**/coverage/

Det sikrer samme formatting på frontend og backend. 5. Configure VS Code
Opret .vscode/settings.json:
{
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
"source.fixAll.eslint": "explicit"
}
}

Tilføj extensions til .devcontainer/devcontainer.json:
{
"name": "dev-environment",
"dockerComposeFile": "../compose.dev.yaml",
"service": "app",
"workspaceFolder": "/workspace",
"customizations": {
"vscode": {
"extensions": [
"esbenp.prettier-vscode",
"dbaeumer.vscode-eslint"
]
}
}
}

Nu installeres de to VS Code-extensions automatisk i Dev Container. 6. Verify ESLint and Prettier
Fra repository root:
npm --prefix frontend run lint
npm --prefix backend run lint

npm --prefix frontend run format:check
npm --prefix backend run format:check

Første gang kan format:check rapportere filer, der endnu ikke er formatteret. Kør da npm --prefix frontend run format og tilsvarende for backend. 7. Verify project structure
dev-environment-poc/
├── .devcontainer/
│ ├── Dockerfile
│ └── devcontainer.json
├── .vscode/
│ └── settings.json
├── frontend/
│ ├── src/
│ ├── eslint.config.js
│ ├── vite.config.ts
│ ├── package.json
│ └── package-lock.json
├── backend/
│ ├── eslint.config.mjs
│ ├── tsconfig.json
│ ├── package.json
│ └── package-lock.json
├── .prettierrc.json
├── .prettierignore
├── compose.dev.yaml
└── Makefile

8. Commit dependencies
   git add .
   git commit -m "Initialize frontend and backend development tooling"

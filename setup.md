# Development Environment Setup

Use this guide to copy the development tooling from the proof-of-concept repository into a new, empty project with the same frontend/backend structure.

## 1. Copy the configuration files

Copy these files and directories from the test project:

```text
project/
├── .devcontainer/
│   ├── Dockerfile
│   └── devcontainer.json
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── .vscode/
│   └── settings.json
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   └── vitest.config.ts
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── vitest.config.mts
├── scripts/
│   └── check-commit-size.sh
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── compose.dev.yml
├── eslint.config.mjs
├── lint-staged.config.mjs
├── commitlint.config.mjs
├── Makefile
├── package.json
└── package-lock.json
```

Copy the relevant `tsconfig` files, test setup files, and application scaffolding as needed. Do not copy `node_modules`.

## 2. Check the Dev Container configuration

Make sure `.devcontainer/devcontainer.json` references the correct Compose filename, service, and workspace path. For example, if the Compose file is named `compose.dev.yml`, do not reference `compose.dev.yaml`.

Open the project in VS Code, then run **Dev Containers: Reopen in Container** from the Command Palette.

## 3. Install dependencies

From the project root, inside the Dev Container:

```bash
npm ci
npm --prefix frontend ci
npm --prefix backend ci
```

`npm ci` installs dependencies using the committed lockfiles. There is no need to repeat the original `npm install` commands.

## 4. Set up Git hooks

If the new project is not already a Git repository:

```bash
git init
```

Make sure the root `package.json` contains the Husky prepare script:

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

If Husky was not initialized during installation, run:

```bash
npm run prepare
```

The hooks should run ESLint on staged source files, run frontend/backend tests with coverage, warn about large commits, and validate commit messages with Commitlint. Keep Prettier on save in VS Code rather than in pre-commit.

## 5. Verify the setup

```bash
npm run lint
npm run test:coverage
```

Also verify that frontend and backend start using their configured `dev` scripts.

## 6. Test the commit hooks

Stage a real change and create a valid Conventional Commit:

```bash
git add .
git commit -m "chore: configure development environment"
```

The pre-commit hook should run linting and tests. The commit-msg hook should reject invalid commit messages.

## 7. Commit the configuration

Commit and push the configuration files and all three sets of `package.json` / `package-lock.json`. Other developers can then clone the repository, open the Dev Container, and install dependencies with `npm ci`.

**Note:** Keep the Node.js version fixed in the Dockerfile for a consistent environment. If the real project uses different paths or service names, update the copied configuration before running it.

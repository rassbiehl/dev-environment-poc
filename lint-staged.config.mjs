export default {
  '**/*.{ts,tsx,js,jsx}': ['eslint', 'prettier --check'],
  '**/*.{json,md,css,yml,yaml}': ['prettier --check'],
};
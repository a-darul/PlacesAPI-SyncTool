6. Git Workflow
Use feature branches:

Branch naming convention: feature/short-description
Commit messages should follow Conventional Commits:

Example: feat: add user authentication
Enable Husky for pre-commit hooks:

bash
Salin kode
npx husky-init && npm install
Add a pre-commit hook for linting and testing:

bash
Salin kode
npx husky add .husky/pre-commit "npm run lint && npm test"

# Contributing to Date Slider Lib

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 20 or higher
- pnpm 10 or higher

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd date-slider-lib

# Install dependencies
pnpm install

# Start Storybook for development
pnpm storybook
```

## Development Workflow

### Available Scripts

- `pnpm dev` - Start Vite dev server
- `pnpm build` - Build the library for production
- `pnpm storybook` - Start Storybook on http://localhost:6006
- `pnpm build-storybook` - Build Storybook for deployment
- `pnpm lint` - Run ESLint (fails on warnings)
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check if code is formatted
- `pnpm type-check` - Run TypeScript type checking
- `pnpm validate` - Run all checks (lint + format + type-check)

### Code Quality Tools

#### ESLint

We use ESLint for code linting with the following plugins:
- TypeScript ESLint
- React & React Hooks
- JSX Accessibility (a11y)
- Prettier integration

Configuration: `eslint.config.js`

**Note on DateSlider Component:**
The DateSlider component intentionally uses patterns that trigger ESLint warnings (accessing refs during render for DOM measurements). These are **expected** and documented in `.eslintrc-dateslider.md`. The component works correctly - these warnings exist because ESLint can't distinguish between problematic ref access and necessary layout calculations.

#### Prettier

Code formatting is enforced using Prettier.

Configuration: `.prettierrc`

Settings:
- Single quotes
- 2-space indentation
- Semicolons required
- 100 character line width
- Trailing commas (ES5)

#### TypeScript

Strict type checking is enabled. All code must be properly typed.

## Git Workflow

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

Format: `<type>: <subject>`

**Allowed types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `build` - Build system changes
- `ci` - CI/CD changes
- `chore` - Other changes
- `revert` - Revert previous commit

**Examples:**
```bash
git commit -m "feat: Add frosted glass style to DateSlider"
git commit -m "fix: Resolve TypeScript error in Button component"
git commit -m "docs: Update README with installation instructions"
```

### Git Hooks

We use Husky to enforce code quality:

**Pre-commit hook:**
- Runs `lint-staged` to:
  - ESLint auto-fix on staged `.ts` and `.tsx` files
  - Prettier formatting on staged files

**Commit-msg hook:**
- Validates commit messages against conventional commits format

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

## Pull Request Process

1. Create a new branch from `main`
2. Make your changes
3. Ensure all checks pass:
   ```bash
   pnpm validate
   ```
4. Commit with conventional commit messages
5. Push your branch and create a Pull Request
6. Wait for CI checks to pass
7. Request review from maintainers

## CI/CD Pipeline

### Continuous Integration

On every push and PR, GitHub Actions will:

1. **Lint & Format Check** - Verify code quality
2. **Type Check** - Ensure TypeScript types are valid
3. **Build** - Build the library
4. **Build Storybook** - Build component documentation

All checks must pass before merging.

### Continuous Deployment

**Storybook Deployment:**
- Automatically deploys to GitHub Pages on push to `main`
- URL: `https://<username>.github.io/<repo-name>/`

**NPM Release:**
- Triggered by pushing a git tag (e.g., `v1.0.0`)
- Automatically publishes to NPM
- Creates GitHub Release with notes

To create a release:
```bash
# Update version in package.json
pnpm version patch  # or minor, major

# Push tag
git push --follow-tags
```

## Project Structure

```
date-slider-lib/
├── .github/
│   └── workflows/       # GitHub Actions CI/CD
├── .husky/             # Git hooks
├── .storybook/         # Storybook configuration
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── index.ts        # Library entry point
├── dist/               # Build output
├── eslint.config.js    # ESLint configuration
├── .prettierrc         # Prettier configuration
├── commitlint.config.js # Commitlint configuration
└── tsconfig.json       # TypeScript configuration
```

## Adding New Components

1. Create component directory in `src/components/`
2. Create component files:
   - `ComponentName.tsx` - Component implementation
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.ts` - Export file
3. Export from `src/index.ts`
4. Add Storybook stories with examples
5. Document props with JSDoc comments

## Testing

Tests will be added in future iterations. For now:
- Manual testing via Storybook
- Type safety via TypeScript
- Code quality via ESLint

## Questions?

Feel free to open an issue for any questions or concerns!

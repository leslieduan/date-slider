# Date Slider Lib

A React TypeScript UI component library built with Vite, Tailwind CSS, and Storybook.

[![CI](https://github.com/your-username/date-slider-lib/workflows/CI/badge.svg)](https://github.com/your-username/date-slider-lib/actions)
[![npm version](https://img.shields.io/npm/v/date-slider-lib.svg)](https://www.npmjs.com/package/date-slider-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Development

Install dependencies:

```bash
pnpm install
```

### Run Storybook

```bash
pnpm storybook
```

This will start Storybook at http://localhost:6006

### Build Library

```bash
pnpm build
```

This will:
1. Generate TypeScript declarations
2. Bundle the library with Vite (ESM and CJS formats)
3. Output to the `dist` directory

## Project Structure

```
src/
├── components/
│   └── Button/
│       ├── Button.tsx          # Component implementation
│       ├── Button.css          # Component styles
│       ├── Button.stories.tsx  # Storybook stories
│       └── index.ts            # Component exports
└── index.ts                    # Library entry point
```

## Adding New Components

1. Create a new folder in `src/components/`
2. Add your component with TypeScript types
3. Create a `.stories.tsx` file for Storybook
4. Export from `src/index.ts`

## Publishing

The library is configured to publish to npm with:
- ESM and CJS formats
- TypeScript declarations
- Proper peer dependencies for React

To publish:

```bash
pnpm publish
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Vite** - Build tool and dev server
- **Storybook 10** - Component documentation and development
- **pnpm** - Package manager

## Code Quality & Tooling

This project uses modern tooling to ensure code quality and maintainability:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Commitlint** - Conventional commit messages
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files
- **GitHub Actions** - CI/CD pipelines

### Quality Scripts

```bash
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix ESLint issues
pnpm format       # Format code with Prettier
pnpm type-check   # TypeScript type checking
pnpm validate     # Run all checks
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Development workflow
- Commit message conventions
- Pull request process
- Code quality standards

## CI/CD

- **Continuous Integration**: Automated linting, type checking, and builds on every PR
- **Storybook Deployment**: Auto-deployed to GitHub Pages on main branch
- **NPM Publishing**: Automated releases via git tags

## License

MIT

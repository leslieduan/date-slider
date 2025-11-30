# Publishing to NPM Guide

Complete guide for publishing `date-slider-lib` to npm.

---

## Prerequisites

### 1. NPM Account

1. Create an account at [npmjs.com](https://www.npmjs.com/signup)
2. Verify your email address
3. (Optional) Enable 2FA for better security

### 2. Check Package Name Availability

```bash
npm search date-slider-lib
```

If the name is taken, update `package.json`:
```json
{
  "name": "@your-username/date-slider-lib"
}
```

---

## Package.json Setup

Your `package.json` is already configured! ✅ Here's what's set up:

```json
{
  "name": "date-slider-lib",           // Package name on npm
  "version": "0.1.0",                   // Semantic versioning
  "description": "A React TypeScript UI component library",

  // Entry points
  "main": "./dist/index.cjs",           // CommonJS entry
  "module": "./dist/index.mjs",         // ESM entry
  "types": "./dist/index.d.ts",         // TypeScript definitions

  // Modern exports (supports both ESM and CJS)
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.cjs"
      }
    }
  },

  // Only publish the dist folder
  "files": ["dist"],

  // Auto-build before publishing
  "prepublishOnly": "pnpm run build",

  // Package metadata
  "keywords": ["react", "typescript", "date-slider", "component-library"],
  "license": "MIT",

  // Peer dependencies (users must install these)
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

### Additional Fields to Add (Optional)

Update these fields in `package.json`:

```json
{
  "author": "Your Name <your.email@example.com>",
  "homepage": "https://github.com/yourusername/date-slider-lib#readme",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/date-slider-lib.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/date-slider-lib/issues"
  }
}
```

---

## Method 1: Manual Publishing (First Time)

### Step 1: Build the Library

```bash
pnpm build
```

This creates the `dist/` folder with:
- `index.mjs` - ESM bundle
- `index.cjs` - CommonJS bundle
- `index.d.ts` - TypeScript definitions
- CSS files (if any)

### Step 2: Test the Build Locally

```bash
# Check what will be published
pnpm pack

# This creates date-slider-lib-0.1.0.tgz
# Extract and verify contents:
tar -xzf date-slider-lib-0.1.0.tgz
ls package/
```

You should see:
```
package/
├── dist/
│   ├── index.mjs
│   ├── index.cjs
│   ├── index.d.ts
│   └── index.css
├── package.json
├── README.md
└── LICENSE
```

### Step 3: Login to NPM

```bash
npm login
```

Enter your credentials:
- Username
- Password
- Email
- (If 2FA enabled) One-time password

### Step 4: Publish

```bash
# First release
npm publish

# Or if using scoped package (@username/package-name)
npm publish --access public
```

### Step 5: Verify

Check your package at:
```
https://www.npmjs.com/package/date-slider-lib
```

---

## Method 2: Automated Publishing (Recommended)

This is already set up in `.github/workflows/release.yml`! 🎉

### How It Works

The workflow automatically publishes when you push a git tag:

```yaml
on:
  push:
    tags:
      - 'v*.*.*'  # Triggers on tags like v1.0.0, v0.2.1, etc.
```

### Setup GitHub Secrets

1. **Get NPM Access Token**

   ```bash
   npm login
   npm token create
   ```

   Copy the token (starts with `npm_...`)

2. **Add to GitHub**

   - Go to your GitHub repo
   - Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Paste your npm token
   - Click "Add secret"

### Publishing Process

#### 1. Update Version

```bash
# Patch version (0.1.0 → 0.1.1)
npm version patch

# Minor version (0.1.0 → 0.2.0)
npm version minor

# Major version (0.1.0 → 1.0.0)
npm version major
```

This automatically:
- Updates `package.json` version
- Creates a git commit
- Creates a git tag

#### 2. Push to GitHub

```bash
# Push commits AND tags
git push origin main --tags
```

#### 3. Watch the Magic ✨

GitHub Actions will automatically:
1. ✅ Install dependencies
2. ✅ Run validation (`pnpm validate`)
3. ✅ Build the library
4. ✅ Publish to NPM
5. ✅ Create a GitHub Release with auto-generated notes

#### 4. Check Results

- **NPM**: https://www.npmjs.com/package/date-slider-lib
- **GitHub Releases**: https://github.com/yourusername/date-slider-lib/releases

---

## Semantic Versioning Guide

Follow [SemVer](https://semver.org/):

| Version | When to Use | Example |
|---------|-------------|---------|
| **Patch** (0.1.0 → 0.1.1) | Bug fixes, no breaking changes | Fixed focus bug |
| **Minor** (0.1.0 → 0.2.0) | New features, backward compatible | Added render props |
| **Major** (0.1.0 → 1.0.0) | Breaking changes | Changed API props |

### Pre-release Versions

```bash
# Alpha release
npm version prerelease --preid=alpha
# Result: 0.1.0 → 0.1.1-alpha.0

# Beta release
npm version prerelease --preid=beta
# Result: 0.1.0 → 0.1.1-beta.0

# Release candidate
npm version prerelease --preid=rc
# Result: 0.1.0 → 0.1.1-rc.0
```

---

## Publishing Checklist

Before publishing, ensure:

- [ ] All tests pass: `pnpm validate`
- [ ] Build succeeds: `pnpm build`
- [ ] README is up to date
- [ ] CHANGELOG is updated (if you maintain one)
- [ ] Version is bumped appropriately
- [ ] Git working directory is clean
- [ ] All changes are committed

```bash
# Quick check script
pnpm validate && pnpm build && git status
```

---

## Updating the Package

### For Bug Fixes

```bash
# 1. Fix the bug
# 2. Commit changes
git add .
git commit -m "fix: resolve focus management issue"

# 3. Bump patch version
npm version patch

# 4. Push
git push origin main --tags
```

### For New Features

```bash
# 1. Add feature
# 2. Commit changes
git add .
git commit -m "feat: add custom render props"

# 3. Bump minor version
npm version minor

# 4. Push
git push origin main --tags
```

### For Breaking Changes

```bash
# 1. Make breaking changes
# 2. Commit with BREAKING CHANGE footer
git add .
git commit -m "feat!: change API structure

BREAKING CHANGE: renamed classNames prop to className"

# 3. Bump major version
npm version major

# 4. Push
git push origin main --tags
```

---

## Troubleshooting

### Error: "Package name too similar to existing package"

Change your package name:
```json
{
  "name": "@your-username/date-slider-lib"
}
```

### Error: "You must be logged in to publish packages"

```bash
npm logout
npm login
```

### Error: "You do not have permission to publish"

For scoped packages:
```bash
npm publish --access public
```

### Build Fails

```bash
# Clean and rebuild
rm -rf dist node_modules
pnpm install
pnpm build
```

### Wrong Files Published

Check `files` field in `package.json`:
```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

Test with:
```bash
pnpm pack
tar -tzf date-slider-lib-0.1.0.tgz
```

---

## After Publishing

### 1. Verify Installation

```bash
# In a test project
npm install date-slider-lib

# Or with specific version
npm install date-slider-lib@0.1.0
```

### 2. Test Import

```tsx
import { DateSlider } from 'date-slider-lib';
import type { SelectionResult } from 'date-slider-lib';
```

### 3. Add Badges to README

```markdown
[![npm version](https://img.shields.io/npm/v/date-slider-lib.svg)](https://www.npmjs.com/package/date-slider-lib)
[![npm downloads](https://img.shields.io/npm/dm/date-slider-lib.svg)](https://www.npmjs.com/package/date-slider-lib)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
```

### 4. Announce Your Package

- Post on Twitter/X
- Share on Reddit (r/reactjs, r/javascript)
- Post on Dev.to
- Add to awesome-react lists

---

## Package Scripts Reference

| Script | Command | Purpose |
|--------|---------|---------|
| `pnpm build` | Build library | Creates production bundle |
| `pnpm validate` | Run checks | Format + type check |
| `pnpm lint` | Lint code | Check code quality |
| `pnpm format` | Format code | Auto-fix formatting |
| `pnpm type-check` | Type check | Verify TypeScript |
| `pnpm storybook` | Start Storybook | Dev documentation |

---

## Best Practices

### 1. Always Test Before Publishing

```bash
# Create test app
pnpm create vite test-app --template react-ts
cd test-app

# Install local build
pnpm add ../date-slider-lib/date-slider-lib-0.1.0.tgz

# Test it works
```

### 2. Keep a CHANGELOG

Create `CHANGELOG.md`:
```markdown
# Changelog

## [0.1.0] - 2024-11-30
### Added
- Initial release
- Point, Range, and Combined modes
- Render props support
- Full TypeScript support
```

### 3. Use Git Tags

Tags trigger automated publishing and create GitHub releases.

### 4. Deprecate Old Versions

If you publish a broken version:
```bash
npm deprecate date-slider-lib@0.1.0 "Broken build, use 0.1.1 instead"
```

### 5. Unpublish (Last Resort)

⚠️ Only within 72 hours and if no downloads:
```bash
npm unpublish date-slider-lib@0.1.0
```

---

## Quick Reference

```bash
# First time setup
npm login
npm publish

# Regular updates (automated)
npm version patch|minor|major
git push origin main --tags

# Emergency unpublish (< 72 hours)
npm unpublish date-slider-lib@0.1.0

# Check package info
npm info date-slider-lib
npm view date-slider-lib versions
```

---

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [GitHub Actions](https://docs.github.com/en/actions)

---

Happy Publishing! 🚀

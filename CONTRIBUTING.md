# Contributing to React Custom Scrollbar

Thank you for your interest in contributing to React Custom Scrollbar! We welcome contributions from the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Issues

- Look through the [existing issues](https://github.com/openabir/React-TS-custom-scrollbar/issues)
- If you find a bug or have a feature request, [create a new issue](https://github.com/openabir/React-TS-custom-scrollbar/issues/new)
- For questions, use [GitHub Discussions](https://github.com/openabir/React-TS-custom-scrollbar/discussions)

### Feature Requests

We welcome feature requests! Please:

- Check if the feature already exists or is planned
- Provide a clear description of the problem you're trying to solve
- Explain why this feature would be useful to other users
- Consider how it fits with the project's goals

## 🛠 Development Setup

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Git

### Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/React-TS-custom-scrollbar.git
   cd React-TS-custom-scrollbar
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run tests to ensure everything is working**

   ```bash
   npm test
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

### Development Scripts

- `npm run build` - Build the project
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run benchmark` - Run performance benchmarks

## 🔄 Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-virtual-scrolling`
- `fix/memory-leak-in-resize-handler`
- `docs/update-api-reference`

### Commit Messages

Follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Examples:

- `feat: add virtual scrolling support`
- `fix: resolve memory leak in resize observer`
- `docs: update API documentation`
- `test: add tests for scroll event handlers`

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (ESLint/Prettier configuration)
- Add JSDoc comments for public APIs
- Use meaningful variable and function names

### Adding Features

1. **Create tests first** - We follow TDD where possible
2. **Implement the feature** - Keep it simple and focused
3. **Update documentation** - Update README.md, JSDoc comments, etc.
4. **Add examples** - If applicable, add usage examples

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Place tests in `src/__tests__/` directory
- Use descriptive test names
- Test both happy paths and error cases
- Aim for high test coverage

### Test Structure

```typescript
describe("ComponentName", () => {
  describe("when condition", () => {
    it("should do something", () => {
      // Test implementation
    });
  });
});
```

## 📤 Submitting Changes

### Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the guidelines above
3. **Run tests** and ensure they pass
4. **Update documentation** as needed
5. **Create a pull request** with a clear title and description

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**:
  - Explain what changes you made and why
  - Reference any related issues
  - Include screenshots for UI changes
  - List any breaking changes

### Example Pull Request Template

```markdown
## Description

Brief description of the changes.

## Changes Made

- [ ] Added feature X
- [ ] Fixed bug Y
- [ ] Updated documentation

## Related Issues

Fixes #123

## Testing

- [ ] All tests pass
- [ ] Added new tests for the changes
- [ ] Manual testing completed

## Breaking Changes

None / List any breaking changes
```

## 📦 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Steps

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create a pull request
4. After merge, tag the release
5. Publish to npm

## 📝 Documentation

### Types of Documentation

- **README.md** - Main documentation
- **API Reference** - Generated from JSDoc comments
- **Examples** - Usage examples in `/examples` directory
- **Changelog** - Version history in `CHANGELOG.md`

### Documentation Guidelines

- Use clear, concise language
- Include code examples
- Keep documentation up-to-date with code changes
- Use proper markdown formatting

## 🤔 Questions?

If you have questions about contributing:

- Check the [FAQ](https://github.com/openabir/React-TS-custom-scrollbar/discussions/categories/q-a)
- Start a [discussion](https://github.com/openabir/React-TS-custom-scrollbar/discussions)
- Reach out to the maintainers

## 🙏 Recognition

Contributors will be recognized in:

- The CHANGELOG.md file
- The project's README.md
- GitHub's contributor list

Thank you for contributing to React Custom Scrollbar! 🎉

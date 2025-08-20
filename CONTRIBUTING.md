# Contributing to SikshaLink

Thank you for considering contributing to SikshaLink! This document provides guidelines and instructions for contributing to this project as part of GSSoC 2025.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [GSSoC 2025 Participation](#gssoc-2025-participation)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Issue Assignment](#issue-assignment)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Communication](#communication)

## 📝 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## 🏆 GSSoC 2025 Participation

SikshaLink is participating in GSSoC (GirlScript Summer of Code) 2025. Contributors can earn points based on the complexity and impact of their contributions.

### Point Structure

- **Level 1 (Easy)**: 10 points
  - Bug fixes
  - Documentation improvements
  - Minor UI enhancements

- **Level 2 (Medium)**: 25 points
  - Implementing new UI components
  - Adding simple API endpoints
  - Basic feature implementation

- **Level 3 (Hard)**: 50 points
  - Complex feature implementation
  - Database schema design and implementation
  - Authentication and authorization systems
  - Integration with external services

- **Level 4 (Expert)**: 100 points
  - Major architectural improvements
  - Real-time communication features
  - Performance optimization at scale
  - End-to-end testing implementation

## 🚀 Getting Started

### Support the Project

Before you begin:
1. Please ⭐ star the repository on GitHub
2. Follow the project maintainer on [GitHub](https://github.com/ratna-jaiswal)
3. Connect on [LinkedIn](https://www.linkedin.com/in/ratna-jaiswal/)

Your support motivates continued development and maintenance!

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/classroom-platform.git
   cd classroom-platform
   ```
3. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream https://github.com/originalowner/classroom-platform.git
   ```

## 💻 Development Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Visit [http://localhost:3000](http://localhost:3000) to view the application.

## 🔄 Contribution Workflow

1. **Select an issue** to work on from the [issues page](https://github.com/originalowner/classroom-platform/issues)
2. **Comment on the issue** that you'd like to work on it and wait for assignment
3. **Create a branch** with a descriptive name:
   ```bash
   git checkout -b feature/add-auth-system
   # or
   git checkout -b fix/login-form-validation
   ```
4. **Implement your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Commit your changes** with meaningful commit messages:
   ```bash
   git commit -m "feat: implement user authentication with JWT"
   ```
7. **Push your branch** to your forked repository:
   ```bash
   git push origin feature/add-auth-system
   ```
8. **Create a Pull Request** from your branch to the main repository

## 🎯 Issue Assignment

- Issues will be assigned on a first-come, first-served basis
- You must wait for a maintainer to assign the issue to you before starting work
- If you haven't made progress on an issue within 5 days, it may be reassigned
- Please only take issues you have time to work on promptly

## 🔍 Pull Request Guidelines

- Each PR should address a single issue or feature
- Include screenshots or videos for UI changes
- Update documentation as needed
- Make sure all tests pass
- Reference the issue that your PR addresses
- Follow the PR template provided

## 📁 Project Structure

```
classroom-platform/
├── app/                  # Next.js app directory with page routes
├── components/           # React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions & shared logic
├── public/               # Static assets
├── api/                  # Backend API routes (to be implemented)
├── models/               # Database models (to be implemented)
├── config/               # Configuration files (to be implemented)
├── middleware/           # Custom middleware (to be implemented)
└── tests/                # Test files (to be implemented)
```

## 🧹 Coding Standards

- **TypeScript**: Use proper typing, avoid `any` when possible
- **React**: Use functional components with hooks
- **CSS**: Follow the BEM naming convention when not using Tailwind classes
- **Naming**: Use descriptive names for variables, functions, and components
- **Comments**: Add comments for complex logic or non-obvious behavior
- **Error Handling**: Properly handle errors and edge cases
- **Formatting**: We use Prettier for code formatting

## 🧪 Testing

- Write tests for new features and bug fixes
- Ensure all tests pass before submitting a PR
- We use Jest and React Testing Library for testing

## 📚 Documentation

- Update documentation for new features
- Add JSDoc comments to functions and components
- Include examples where appropriate

## 💬 Communication

- Join our [Discord server](https://discord.gg/example) for real-time communication
- Ask questions in the issue comments if you're unsure about something
- Attend our weekly contributor meetings (schedule in Discord)

---

Thank you for contributing to SikshaLink! Your efforts help make education more accessible and efficient for everyone. Happy coding! 🚀

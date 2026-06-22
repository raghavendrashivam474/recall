# Recall

> The memory layer for software projects.

Recall is a Visual Studio Code extension designed to help developers understand and retain codebase context over time.

Instead of only explaining what code does, Recall focuses on explaining:

* Why a file exists
* How it fits into the system
* What responsibilities it owns
* How it connects to surrounding modules

---

## The Problem

Developers frequently lose context when:

* Returning to old projects
* Joining unfamiliar codebases
* Reading undocumented code
* Navigating large repositories

Understanding a file often requires tracing multiple modules, reading commit history, and reconstructing architectural intent.

Recall aims to reduce that friction.

---

## MVP Goal

Help a developer understand an unfamiliar file within 60 seconds.

The first version focuses on:

* File summaries
* Dependency awareness
* Context explanations
* "Why This Exists" insights
* VS Code sidebar integration

---

## Current Status

**Phase:** Early Development

### Completed

* Project initialization
* VS Code extension scaffolding
* TypeScript setup
* esbuild configuration
* Build and debug pipeline verification

### In Progress

* Extension identity setup
* Sidebar implementation
* Active file detection

---

## Planned Architecture

```text
VS Code Extension
        │
        ▼
Parser Engine
        │
        ▼
Context Builder
        │
        ▼
AI Layer
        │
        ▼
Recall Sidebar
```

---

## Tech Stack

* TypeScript
* VS Code Extension API
* esbuild
* Node.js

Future:

* SQLite
* Grok / OpenAI / Ollama
* Tree-sitter

---

## Project Structure

```text
src/
├── core/
├── parser/
├── ai/
├── sidebar/
├── storage/
├── providers/
├── commands/
├── types/
└── utils/
```

---

## Vision

Recall is not intended to be another AI coding assistant.

The long-term goal is to build a system that preserves project understanding and helps software teams retain knowledge over time.

A developer should feel:

> "The project remembers itself."

---

## Development Updates

Progress updates are maintained under:

```text
docs/updates/
```

---

## License

MIT

```
```

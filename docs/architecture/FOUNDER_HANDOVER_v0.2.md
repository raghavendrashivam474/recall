# Recall

## Founder Handover & Continuity Document

Version: v0.1

Status: Active Development

Prepared By: Raghav

Last Updated: 23 June 2026

---

# Purpose

This document exists to ensure project continuity.

A new developer should be able to:

* Understand Recall's vision
* Understand current progress
* Understand architectural decisions
* Continue development without requiring verbal explanations

This document is considered the single source of truth for the current state of the project.

---

# Project Overview

## What is Recall?

Recall is a Visual Studio Code extension designed to act as a memory layer for software projects.

Traditional AI coding tools focus on:

* code generation
* autocompletion
* code suggestions

Recall focuses on:

* project understanding
* context preservation
* architectural awareness
* developer memory

The goal is to help developers understand unfamiliar codebases quickly.

---

# Core Problem

Developers frequently lose context when:

* returning to old projects
* joining unfamiliar repositories
* reading undocumented code
* navigating large systems

Current tooling helps write code.

Very little tooling helps remember code.

Recall exists to solve that problem.

---

# Product Mission

Help developers understand:

* What a file does
* Why it exists
* Where it connects
* How it contributes to the system

within 60 seconds.

---

# Current Development Status

## Repository Status

✅ Repository Created

✅ Initial Commit Completed

✅ README Added

✅ Development Documentation Established

✅ Development Update #1 Completed

✅ Development Update #2 Completed

---

# MVP Progress Overview

| Phase                        | Status     |
| ---------------------------- | ---------- |
| Project Foundation           | ✅ Complete |
| Foundation UI & Architecture | ✅ Complete |
| Parser Engine                | ⏳ Next     |
| AI Context Layer             | ⏳ Planned  |
| Dependency Insights          | ⏳ Planned  |
| Persistent Memory            | ⏳ Planned  |

Estimated MVP Completion: ~35%


## Repository Status

Repository Created

Initial Commit Completed

README Added

Development Documentation Started

Development Update #1 Completed

---

# Completed Work

## Environment Setup

Verified:

* Node.js
* npm
* Git
* VS Code

Development environment is operational.

---

## Tooling Setup

Installed:

* Yeoman
* generator-code

Project generated using Microsoft's official VS Code extension generator.

---

## Project Scaffolding

Configuration:

Language:
TypeScript

Bundler:
esbuild

Package Manager:
npm

Git:
Initialized

---

## Build Validation

Successfully verified:

* compilation
* bundling
* extension host launch
* command registration
* debugging workflow

Current extension runs correctly.

---

recall/

├── docs/
│   ├── architecture/
│   ├── roadmap/
│   └── updates/
│
├── src/
│   ├── core/
│   ├── parser/
│   ├── ai/
│   ├── sidebar/
│   ├── storage/
│   ├── providers/
│   ├── commands/
│   ├── types/
│   └── utils/
│
├── package.json
├── tsconfig.json
├── esbuild.js
└── README.md


```text
recall/

├── .vscode/

├── docs/
│   └── updates/
│       └── DEVELOPMENT_UPDATE_01.md

├── src/
│   ├── extension.ts
│   └── test/

├── package.json
├── tsconfig.json
├── esbuild.js
├── README.md
└── .gitignore
```

This structure is temporary.

Refactoring is planned in the next implementation phase.

---

# Architectural Decisions

## Decision 1

### TypeScript

Reason:

Native compatibility with VS Code extension ecosystem.

Decision Status:

LOCKED

---

## Decision 2

### esbuild

Reason:

* faster builds
* minimal configuration
* lower maintenance overhead

Decision Status:

LOCKED

---

## Decision 3

### Local-First Architecture

The MVP should function without requiring cloud infrastructure.

Reason:

* lower complexity
* lower cost
* faster iteration

Decision Status:

LOCKED

---

## Decision 4

### Provider Abstraction Pattern

AI integrations must not be coupled to a single vendor.

Required architecture:

```text
AIProvider

├── GrokProvider
├── OpenAIProvider
├── AnthropicProvider
└── OllamaProvider
```

Decision Status:

LOCKED

---

## Decision 5

### Secret Storage

Use:

VS Code SecretStorage API

Never store API keys in:

* settings.json
* local files
* plaintext storage

Decision Status:

LOCKED

---

# MVP Scope

The MVP has one objective:

Help developers understand a single file.

---

# MVP Features

## Feature 1

File Summary

Generate:

* file purpose
* responsibilities
* important functions

---

## Feature 2

Dependency Awareness

Display:

* imports
* exports
* related modules

---

## Feature 3

Why This Exists

Generate an inferred explanation describing:

* probable purpose
* architectural role

Must always be labeled as inferred context.

---

## Feature 4

Recall Sidebar

Dedicated VS Code sidebar containing:

* file summary
* context information
* dependency insights

---

# Explicitly Out Of Scope

Do NOT implement:

* cloud sync
* team collaboration
* authentication
* billing
* code generation
* multi-agent workflows
* architecture maps
* embeddings
* vector databases

These belong to future releases.

---

Immediate Next Phase

Phase Name:
Parser Engine

Objective:

Enable Recall to understand source code structure through deterministic analysis.

Deliverables:

* Import extraction
* Export extraction
* Function discovery
* Class discovery
* Interface discovery
* File metadata generation

Target Output:

Structured FileMetadata objects that can be consumed by future AI systems.


## Phase Name

Foundation UI & Extension Architecture

---

# Deliverables

### 1

Update package metadata

---

### 2

Create modular structure

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

### 3

Create Recall Activity Bar icon

---

### 4

Build Recall sidebar

---

### 5

Implement active file detection

Display:

* file name
* relative path

---

### 6

Create core service layer

```text
core/

├── ExtensionManager.ts
├── EventManager.ts
└── ContextManager.ts
```

Only scaffolding is required initially.

---

# Future Development Sequence

Phase 1

Foundation UI

↓

Phase 2

Parser Engine

↓

Phase 3

AI Summaries

↓

Phase 4

Dependency Insights

↓

Phase 5

Persistent Memory

↓

Phase 6

Project-Level Understanding

---

# Risks

## Hallucinated Context

Potential issue:

AI may incorrectly infer file purpose.

Mitigation:

* Git history
* file relationships
* confidence indicators
* inferred-content labeling

---

## Scope Creep

Potential issue:

Adding advanced AI features before validating core value.

Mitigation:

Strict MVP boundaries.

---

# Success Criteria

A developer opens an unfamiliar file.

Within 60 seconds they understand:

* What the file does
* Why it exists
* Where it connects

If Recall consistently achieves this outcome, the MVP is successful.

---

# Project Principle

Build understanding before intelligence.

Build usefulness before complexity.

Build trust before automation.

Recall should make developers feel:

"The project remembers itself."

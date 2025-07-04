# Mini Google Flights (React + TypeScript)

A modern web app for flight search, built with React, TypeScript, Redux Toolkit, Axios, and more. Supports mock/demo mode, live API mode, offline caching, and a clean architecture.

## Features
- Flight search with mock and live API modes
- Virtualized flight results for performance
- IndexedDB caching for offline/fast access
- Clean architecture (UI, repository/data, state)
- Redux Toolkit for state management
- Axios with interceptors for networking
- ESLint + Prettier for code quality
- GitHub Actions CI for lint, test, and build
- Unit and integration tests

## Stack
- React + TypeScript
- Redux Toolkit
- Axios
- React Router v6
- react-window (virtualized lists)
- idb (IndexedDB caching)
- Jest + React Testing Library
- ESLint + Prettier

## Mock vs Live Mode
- Use the "Mock Mode" toggle in the UI to switch between mock/demo data and live API calls.
- In Mock Mode, all searches use local mock data (no API quota needed).
- In Live Mode, real API calls are made (requires a valid RapidAPI key in `.env`).

## Caching
- Flight search results are cached in IndexedDB for offline/fast access.
- Cache is keyed by origin, destination, and date.

## Architectural Decisions
- Clean separation of UI, domain, and data layers
- Repository Pattern for data access
- Redux Toolkit for state
- IndexedDB for caching
- Virtualized lists for performance
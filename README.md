# Mini Google Flights (React + TypeScript)

A modern web app for flight search, built with React, TypeScript, Redux Toolkit, Axios, and more. Supports mock/demo mode, live API mode, offline caching, and a clean architecture.

## Loom Presentation
https://www.loom.com/share/b6178193723a4d1db0f04a1b69442492?sid=962ab786-101a-4132-86fd-bf496088ab1e

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

## Screenshots
<img width="595" alt="Screenshot 2025-07-03 at 9 46 02 PM" src="https://github.com/user-attachments/assets/54d5a28c-2e03-43a6-838c-c853a740d45b" />
<img width="375" alt="Screenshot 2025-07-03 at 9 45 54 PM" src="https://github.com/user-attachments/assets/520e03d9-e5e0-4fe4-ab39-3a3109801c15" />
<img width="640" alt="Screenshot 2025-07-03 at 9 45 22 PM" src="https://github.com/user-attachments/assets/ca1ca852-e30b-493e-9baa-4335d5826cdb" />
<img width="637" alt="Screenshot 2025-07-03 at 9 45 10 PM" src="https://github.com/user-attachments/assets/2730e317-6da1-4461-8098-24c389f67451" />
<img width="709" alt="Screenshot 2025-07-03 at 9 44 03 PM" src="https://github.com/user-attachments/assets/607e6e7e-92cd-41eb-bd79-07a4300b9e94" />
<img width="280" alt="Screenshot 2025-07-03 at 9 43 50 PM" src="https://github.com/user-attachments/assets/78140976-ac1a-4fb0-a884-400de47c1465" />
<img width="669" alt="Screenshot 2025-07-03 at 9 43 41 PM" src="https://github.com/user-attachments/assets/5518e0a4-8d5d-45a5-8f93-c278dd403865" />


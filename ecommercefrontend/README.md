# E-Commerce Frontend

The frontend is a React 18 and TypeScript application built and served locally with Vite. It provides the browser UI and communicates with the Spring Boot backend over HTTP.

For the overall architecture and instructions for running both applications together, see the [project README](../README.md). The backend API, security, and data-layer details are in the [backend README](../EcommerceBackend/README.md).

## Current functionality

The current UI is an initial application foundation:

- `src/index.tsx` mounts the React application into the root HTML element.
- `src/App.tsx` imports Bootstrap styling and renders the main navigation.
- `src/components/common/navbar/mainNav.tsx` renders navigation links, a search field, and login/logout UI state.
- `src/components/login/login.tsx` renders the login modal and submits credentials using Axios.
- The login component stores the returned JWT in browser `localStorage`; the navigation checks for a stored token on startup and removes it on logout.

The backend has additional product, cart, order, and user endpoints. Not all of those API capabilities currently have corresponding frontend screens. Use the repository's [Bruno](../bruno/) or [Postman](../postman/) collections to test backend APIs independently.

## Frontend request and authentication flow

1. The React app renders the navigation and login modal.
2. When the login form is submitted, the login component sends the username and password as JSON to `POST http://localhost:8000/api/users/login` using Axios.
3. The backend returns a JWT when authentication succeeds.
4. The frontend stores the response token in `localStorage` and updates the navigation's logged-in state.
5. Protected backend endpoints expect the JWT in the `Authorization` header using the `Bearer` authentication scheme. The current login screen stores the token but does not yet issue protected API calls.

The backend's CORS configuration allows the local Vite origin `http://localhost:5173`.

## Requirements

- Node.js and npm
- The Spring Boot backend running at `http://localhost:8000` for login and API-backed functionality

## Development

From this directory:

```sh
npm install
npm run dev
```

Vite prints the local development URL in the terminal (typically `http://localhost:5173`).

## Type-check and production build

Run the TypeScript check:

```sh
npm run typecheck
```

Build the production bundle:

```sh
npm run build
npm run preview
```

The production bundle is written to `dist/`. `npm run build` runs the TypeScript check before creating the Vite bundle.

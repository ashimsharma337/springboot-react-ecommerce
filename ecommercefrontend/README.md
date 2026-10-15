# E-Commerce Frontend

The frontend is a React 18 and TypeScript application built and served locally with Vite. It provides the browser UI and communicates with the Spring Boot backend over HTTP.

For the overall architecture and instructions for running both applications together, see the [project README](../README.md). The backend API, security, and data-layer details are in the [backend README](../EcommerceBackend/README.md).

## Current functionality

- `src/index.tsx` mounts the React application into the root HTML element.
- `src/App.tsx` composes the responsive NEXUS storefront and shares cart, search, and authentication state across the home and product routes.
- `src/components/landing/` contains the reusable hero, category grid, product cards, engineering story, and footer.
- `src/components/product-detail/` contains the reusable detail-page gallery, purchase controls, and keyboard-accessible information tabs.
- `src/data/storefront.ts` provides the typed category and product catalog; `src/data/studioOneDetail.ts` holds the product-specific gallery, specifications, and review content.
- React Router renders the home page at `/` and Studio One detail page at `/products/studio-one-headphone`.
- The product detail view includes selectable gallery images, finishes, optional flight-shell bundle, quantity selection, product specifications, acoustic information, box contents, and sample reviews. Add-to-bag updates the shared demo cart; checkout is not connected.
- The navigation filters catalog products as the visitor types, supports a `⌘K` / `Ctrl+K` search shortcut, and exposes responsive category links.
- Product quick-add and the flagship CTA update a demo cart count and show an accessible confirmation toast. The keynote and newsletter interactions are frontend presentation examples; they do not call backend endpoints.
- `src/components/login/login.tsx` renders the login modal and submits credentials using Axios. On successful login, the returned JWT is stored in browser `localStorage`; sign-out removes it.
- `src/styles/` contains the shared Sass color and typography tokens plus responsive storefront styles. Geist and Hanken Grotesk typefaces and Material Symbols are loaded from Google Fonts.

The backend has additional product, cart, order, and user endpoints. Not all of those API capabilities currently have corresponding frontend screens. Use the repository's [Bruno](../bruno/) or [Postman](../postman/) collections to test backend APIs independently.

## Frontend request and authentication flow

1. The React app renders the storefront, navigation, and login modal.
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

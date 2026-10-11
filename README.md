# Spring Boot + React E-Commerce

A full-stack e-commerce learning project with a React and TypeScript frontend, a Spring Boot REST API, and a PostgreSQL database. The repository separates the frontend and backend documentation while this README provides the overall project overview and links to the detailed guides.

## Project at a glance

The application is organized as three cooperating parts:

```text
Browser
  └── React + TypeScript UI (Vite)
        └── HTTP / JSON requests (Axios)
              └── Spring Boot REST API
                    ├── Spring Security + JWT authentication
                    ├── Controller → Service → Spring Data JPA
                    └── PostgreSQL
```

- **Frontend:** renders the user interface and sends API requests.
- **Backend:** exposes REST endpoints, applies application logic, authenticates requests, and reads or writes application data.
- **Database:** PostgreSQL stores users, products, cart entries, and orders.

## Repository layout

- [`EcommerceBackend/`](EcommerceBackend/) — Spring Boot API, security, services, and persistence
- [`ecommercefrontend/`](ecommercefrontend/) — React + TypeScript application
- [`database/`](database/) — PostgreSQL schema, seed data, and database setup documentation
- [`bruno/`](bruno/) — Bruno API collection
- [`postman/`](postman/) — Postman collection export

## Technologies

| Area | Tools and techniques |
| --- | --- |
| Frontend | React 18, TypeScript, Vite |
| UI | Bootstrap, React Bootstrap, React Icons |
| HTTP | Axios and JSON REST requests |
| Backend | Java, Spring Boot, Spring MVC |
| Persistence | Spring Data JPA, Hibernate, PostgreSQL |
| Authentication | Spring Security, JWT, BCrypt password hashing |
| Build tools | Maven for the backend; npm scripts and Vite for the frontend |

## How the application fits together

### Frontend

The frontend is a TypeScript React application. `src/index.tsx` mounts the React app, and `src/App.tsx` renders the main navigation component. The navigation currently provides links and a login modal; the login modal sends the credentials to the backend with Axios. On successful login, the returned token is saved in browser `localStorage`.

The frontend can be explored and run independently from the API. See the [frontend README](ecommercefrontend/README.md) for its structure and commands.

### Backend

The backend is a layered Spring Boot application:

1. **Controller layer** maps HTTP routes and JSON request bodies to Java methods.
2. **Service layer** performs the application operations.
3. **Repository layer** uses Spring Data JPA for database access.
4. **Entity layer** maps Java objects to relational tables.

Spring Security protects API routes. The login endpoint authenticates credentials and returns a JWT. For protected requests, the JWT filter validates the access token and establishes the request's authenticated principal before the controller is called. The backend guide explains the layers, entities, endpoints, annotations, error handling, and request lifecycle in detail.

See the [backend README](EcommerceBackend/README.md) for the backend architecture and API details.

### Database

PostgreSQL is the persistent data store. Database schema, seed data, local configuration, and setup instructions are documented in the [database README](database/README.md). It also describes the relationship between the SQL schema and the JPA entities.

## End-to-end request and response flow

### Login

1. A user submits the login form in the React UI.
2. The login component sends `POST http://localhost:8000/api/users/login` with a JSON username and password using Axios.
3. Spring Security permits the login request without an existing JWT.
4. The user controller delegates authentication to the user service and Spring Security's `AuthenticationManager`.
5. The authentication provider loads the user and verifies the submitted password against its BCrypt hash.
6. On success, the backend generates a JWT and returns it in the response body.
7. The frontend stores the returned token in `localStorage` and updates its logged-in UI state.

### A protected API call

1. The frontend sends an API request with the JWT in the `Authorization` header. Protected API calls use the `Bearer` authentication scheme.
2. The JWT filter extracts the token, loads the corresponding user, validates the token, and sets authentication in Spring Security's context.
3. Spring MVC routes the request to the matching controller method and converts JSON input into Java objects where required.
4. The controller calls the relevant service, which performs the operation and uses a repository to read or modify data.
5. Spring Data JPA and Hibernate execute the database operation against PostgreSQL.
6. The result travels back through the repository, service, and controller. Spring serializes the returned value as JSON and sends the HTTP response to the frontend.
7. The frontend uses the response to update or render the UI.

If a service throws a handled exception, the backend's global exception handler maps it to an HTTP response. The frontend or API client receives that response instead of the normal success result.

## Run locally

### 1. Prepare PostgreSQL

Follow the database prerequisites and setup instructions in the [database README](database/README.md), including applying the schema and optional seed data. Configure `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` if your local database differs from the documented defaults.

### 2. Start the backend

From the repository root:

```sh
cd EcommerceBackend
sh ./mvnw spring-boot:run
```

The backend listens on `http://localhost:8000`.

### 3. Start the frontend

In a separate terminal, from the repository root:

```sh
cd ecommercefrontend
npm install
npm run dev
```

Vite prints the frontend development URL in the terminal (typically `http://localhost:5173`). The backend CORS configuration is set up for that local origin.

For frontend type-checking and production build commands, see the [frontend README](ecommercefrontend/README.md). Backend build and architecture details are in the [backend README](EcommerceBackend/README.md).

## Test API requests

The repository includes collections for both Bruno and Postman:

- [Bruno collection](bruno/) — open or import the collection folder in Bruno.
- [Postman collection JSON](postman/springboot-react-ecommerce-postman.json) — import this file in Postman.

Start the backend and database first. Run the collection's login request, then provide the returned JWT in the collection's `token` variable before running authenticated requests. The collections use `http://localhost:8000` as the default backend URL.

## Scope and current implementation

This repository is an evolving project. The backend exposes user, product, cart, and order endpoints. The current frontend is an early UI foundation with navigation and a login modal; not every backend capability necessarily has a corresponding finished frontend screen. API collections can be used to exercise backend endpoints independently of the UI.

For detailed responsibilities and implementation notes, see:

- [Backend architecture and API guide](EcommerceBackend/README.md)
- [Frontend setup and development guide](ecommercefrontend/README.md)
- [Database setup and model notes](database/README.md)

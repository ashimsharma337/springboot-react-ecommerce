# Spring Boot + React E-Commerce Application

This project is a full-stack e-commerce application built with a Java Spring Boot backend and a React frontend. The system supports user management, product management, cart operations, and order processing. It follows a layered Spring architecture and shows how a REST API, Spring Security, JWT authentication, and JPA/Hibernate work together to provide a practical e-commerce backend.

## 1. Project Concept

The business idea is a simple online store where:

- Users can create accounts and log in.
- Products can be created, listed, updated, and removed.
- A user can add products to a cart.
- A user can place or track orders.
- Authentication is required for protected endpoints.

The domain model is centered on four main entities:

- User
- Product
- Cart
- Order

The backend stores these in PostgreSQL and exposes them through REST endpoints for the frontend.

## 2. Repository Structure

- [EcommerceBackend](EcommerceBackend) — Spring Boot REST API and business logic
- [ecommercefrontend](ecommercefrontend) — React + Vite frontend
- [database](database) — SQL schema, seed scripts, and database documentation

### Backend package layout

- `com.ashim.controller` — REST controllers
- `com.ashim.service` — business logic services
- `com.ashim.dao` — Spring Data repositories
- `com.ashim.entity` — JPA entities / persistence model
- `com.ashim.config` — security, JWT filter, and app configuration
- `com.ashim.exceptions` — custom exceptions and global error handling

## 3. High-Level Architecture

The application follows a classic layered architecture:

```text
React Frontend (Vite + Bootstrap)
            |
            v
HTTP Requests / API Calls
            |
            v
Controller Layer (REST endpoints)
            |
            v
Service Layer (business logic)
            |
            v
Repository Layer (Spring Data JPA)
            |
            v
PostgreSQL Database

Security Layer (JWT + Spring Security)
      ^
      |
   Request filter + Auth provider
```

### Main responsibilities by layer

- Presentation layer: React UI and bootstrap-based screens
- Controller layer: receives HTTP requests and maps them to service methods
- Service layer: handles business logic and validation
- Data layer: JPA entities and repositories talk to the database
- Security layer: authenticates users and validates JWT tokens
- Exception layer: converts runtime failures into HTTP responses

## 4. Tools and Technologies Used

### Backend

- Java 17+ (project is built as a Spring Boot app)
- Spring Boot 3.x style APIs
- Spring MVC for REST endpoints
- Spring Security for authentication and authorization
- Spring Data JPA + Hibernate for persistence
- PostgreSQL as the relational database
- JWT (JSON Web Token) for stateless authentication
- BCrypt password hashing
- Lombok for reducing boilerplate (`@Data`)
- SLF4J logging for request and service logging
- Maven for dependency management and build lifecycle

### Frontend

- React 18
- Vite for development/build tooling
- TypeScript
- Bootstrap + React Bootstrap for UI components
- Axios for API communication

## 5. Data Layer

The data layer is built with JPA entities and repository interfaces. This keeps the code clean and database operations simple.

### Entity model

#### User

- Table: `app_user`
- Fields: `id`, `username`, `email`, `password`, `role`
- Used for login, registration, and identity management

#### Product

- Table: `product`
- Fields: `id`, `name`, `price`, `description`, `stock`, `category`
- Used for catalog management

#### Cart

- Table: `cart`
- Fields: `id`, `user`, `product`, `quantity`, `status`
- Represents the relationship between a user and product selection

#### Order

- Table: `orders`
- Fields: `id`, `user`, `totalPrice`, `orderDate`, `status`
- Represents purchase transactions

### Repository layer

The repository interfaces extend `JpaRepository<T, Long>`:

- `IUserRepository`
- `IProductRepository`
- `ICartRepository`
- `IOrderRepository`

Examples:

- `IUserRepository.findByUsername(...)` finds a user during login
- `ICartRepository.findByUserId(...)` fetches all cart entries for a particular user

This is the Spring Data JPA approach: the framework generates CRUD operations automatically, allowing minimal boilerplate code.

## 6. Service Layer

The service layer contains the business logic. It sits between controllers and repositories.

### User service

- Handles user creation
- Verifies login credentials
- Generates JWT token on successful login
- Fetches users by ID and list all users
- Updates and deletes users

### Product service

- Creates products
- Reads product details
- Lists all products
- Updates product information
- Deletes products

### Cart service

- Adds items to cart
- Retrieves user cart items
- Updates quantity/status
- Removes cart items

### Order service

- Creates orders
- Retrieves an order by ID
- Lists all orders
- Updates order status and price
- Deletes orders

This service layer is important because controllers remain thin and do not contain business rules.

## 7. Controller Layer

The controllers expose REST endpoints for the frontend.

### UserController

Base path: `/api/users`

- `POST /api/users` — create a user
- `GET /api/users/{id}` — fetch a user by ID
- `GET /api/users` — fetch all users
- `PUT /api/users/{id}` — update an existing user
- `DELETE /api/users/{id}` — delete a user
- `POST /api/users/login` — sign in and receive JWT token

### ProductController

Base path: `/api/products`

- `POST /api/products` — create a product
- `GET /api/products/{id}` — fetch product by ID
- `GET /api/products` — list all products
- `PUT /api/products/{id}` — update product
- `DELETE /api/products/{id}` — delete product

### CartController

Base path: `/api/carts`

- `POST /api/carts` — add an item to cart
- `GET /api/carts/user/{id}` — fetch cart for a user
- `PUT /api/carts/{cartId}` — update cart item quantity/status
- `DELETE /api/carts/{cartId}` — remove cart item

### OrderController

Base path: `/api/orders`

- `POST /api/orders` — create a new order
- `GET /api/orders/{id}` — fetch order details
- `GET /api/orders` — list all orders
- `PUT /api/orders/{id}` — update an order
- `DELETE /api/orders/{id}` — delete order

All controller methods return either domain entities directly or `ResponseEntity<T>` for status-aware responses.

## 8. Exception Layer

The project has a custom exception strategy through `GlobalExceptionHandler`.

### Custom exceptions

- `ProductNotFoundException`
- `UserNotFoundException`
- `OrderNotFoundException`

These exceptions are thrown from the service layer when records are not found.

### Global exception handling

`GlobalExceptionHandler` is annotated with `@ControllerAdvice`, which allows the app to handle exceptions centrally across all controllers.

Examples:

- `@ExceptionHandler(ProductNotFoundException.class)`
- `@ExceptionHandler(UserNotFoundException.class)`
- `@ExceptionHandler(OrderNotFoundException.class)`
- `@ExceptionHandler(IllegalArgumentException.class)`

These methods return a `ResponseEntity` with the proper HTTP status and message.

## 9. Security and Configuration

### Security configuration

`SecurityConfig` is the central configuration class for Spring Security.

It configures:

- CSRF disabled for API usage
- CORS enabled
- unrestricted access for `/api/users` and `/api/users/login`
- all other routes require authentication
- stateless sessions
- JWT filter added before the username/password authentication filter
- password encoder bean using BCrypt
- authentication manager bean

### JWT flow

`JwtFilter` intercepts incoming requests and checks for a Bearer token in the `Authorization` header.

- Token is extracted from the request
- User is identified from the token
- `UserDetailsServiceImpl` loads the user from the database
- `JWTService` validates the JWT
- Authentication is attached to the `SecurityContextHolder`

### User details and principal

`UserPrincipal` implements `UserDetails`, which allows Spring Security to understand the user identity and roles.

### BCrypt

Passwords are encoded before saving to the database using `BCryptPasswordEncoder`.

### CORS

The project allows frontend requests from:

- `http://localhost:5173`

This is necessary because the React frontend runs on a different port from the Spring Boot server.

## 10. Annotations Used in the Project

The table covers annotations used by the current codebase and includes `@Autowired` as a refresher from the earlier version. The `@Autowired` row is marked as historical because it is not used in the current code.

| Annotation | Purpose | Where used |
|---|---|---|
| `@SpringBootApplication` | Marks the application entry point and enables auto-configuration | `EcommerceBackendApplication` |
| `@Service` | Marks a class as a Spring service bean | Service implementations |
| `@RestController` | Marks a class as a REST controller | All controller classes |
| `@RequestMapping` | Maps a base URL path to a controller | Controllers |
| `@PostMapping` | Handles HTTP POST requests | CRUD endpoints |
| `@GetMapping` | Handles HTTP GET requests | Read endpoints |
| `@PutMapping` | Handles HTTP PUT requests | Update endpoints |
| `@DeleteMapping` | Handles HTTP DELETE requests | Delete endpoints |
| `@PathVariable` | Binds a URL variable to a method parameter | Controller endpoints |
| `@RequestBody` | Binds request JSON body to an object | Controller method parameters |
| `@Entity` | Marks a class as a JPA entity | `User`, `Product`, `Cart`, `Order` |
| `@Table` | Maps entity to a database table | Entity classes |
| `@Id` | Marks the primary key field | Entity classes |
| `@GeneratedValue` | Configures primary key generation | Entity classes |
| `@Column` | Maps a field to a database column | Entity classes |
| `@ManyToOne` | Declares a many-to-one relationship | `Cart.user`, `Cart.product`, `Order.user` |
| `@JoinColumn` | Specifies the foreign key column | Relationship fields |
| `@Data` | Lombok annotation that generates getters/setters/toString/equals/hashCode | Entity classes |
| `@Configuration` | Marks a class as a Spring configuration class | `SecurityConfig` |
| `@EnableWebSecurity` | Enables Spring Security web support | `SecurityConfig` |
| `@Bean` | Declares a bean for the Spring context | `SecurityConfig` |
| `@Autowired` | Requests dependency injection on a constructor, field, or setter. Historically used here to inject Spring-managed dependencies; it is not used in the current code. With a single constructor, Spring automatically injects its dependencies, so `@Autowired` is unnecessary. | Previously used for dependency injection; current classes use constructor injection without the annotation |
| `@Component` | Registers a class as a Spring component | `JwtFilter` |
| `@ControllerAdvice` | Centralizes exception handling across controllers | `GlobalExceptionHandler` |
| `@ExceptionHandler` | Maps an exception type to a controller advice method | `GlobalExceptionHandler` |
| `@Override` | Indicates a method overrides a superclass/interface method | Service implementations |
| `@SpringBootTest` | Marks a Spring Boot test class | `EcommerceBackendApplicationTests` |
| `@Test` | JUnit test method annotation | Test class |

## 11. End-to-End Request Flow

Here is how a request is processed from the frontend to the database and back.

### Example: user login request

1. The React frontend sends a POST request to `http://localhost:8000/api/users/login` with JSON like:

```json
{
  "username": "alexchen",
  "password": "password"
}
```

2. The browser request is accepted by the Spring Boot app.
3. `SecurityConfig` allows `/api/users/login` without authentication.
4. `JwtFilter` checks if the request includes a Bearer token.
5. Since login requests do not have a token yet, the request proceeds normally.
6. `UserController.login(...)` receives the request body and calls `UserServiceImpl.verify(...)`.
7. `AuthenticationManager` authenticates the username and password.
8. If successful, `JWTService.generateToken(username)` creates a JWT.
9. The JWT string is returned to the frontend.
10. The frontend stores it in local storage and attaches it as `Authorization: Bearer <token>` for future requests.

### Example: fetching products

1. The frontend calls `GET /api/products`.
2. Spring Security checks whether the user is authenticated.
3. `JwtFilter` reads the token from the `Authorization` header.
4. `UserDetailsServiceImpl` loads the user from the database.
5. `JWTService.validateToken(...)` verifies the token.
6. Spring sets the authenticated principal in the security context.
7. `ProductController.getAllProducts()` invokes `productService.getAllProducts()`.
8. `ProductServiceImpl` calls `IProductRepository.findAll()`.
9. JPA/Hibernate queries PostgreSQL and returns `List<Product>`.
10. The controller returns the list to the caller.
11. The frontend renders the returned data in the UI.

### Example: database error or missing record

1. A service method calls `repo.findById(id)` and finds nothing.
2. The service throws a custom exception like `UserNotFoundException`.
3. The exception is handled by `@ControllerAdvice`.
4. `GlobalExceptionHandler` builds an HTTP response such as `500 Internal Server Error` with the message.
5. The frontend receives the error response and handles failure gracefully.

## 12. How the Frontend Connects to the Backend

The frontend uses Axios to call the backend APIs. For example, the login page sends a request to the backend and stores the returned token locally.

The backend allows cross-origin requests from the frontend by configuring CORS for `http://localhost:5173`.

This arrangement is a classic frontend-backend separation:

- Frontend: UI and user experience
- Backend: data persistence, auth, rules, and APIs
- Database: durable state storage

## 13. Practical Notes

- The project directly returns JPA entity objects in most controllers rather than DTOs.
- This is simple and fast for learning, but in production, DTOs are often preferred to decouple API contracts from database entities.
- The current implementation uses `spring.jpa.hibernate.ddl-auto=update`, which is convenient for development but not a full migration strategy for production.
- The architecture is clear and easy to understand because each layer has a single responsibility.

## 14. Run the Project

### Backend

From the repository root:

```bash
cd EcommerceBackend
./mvnw spring-boot:run
```

Backend default URL:

```text
http://localhost:8000
```

### Frontend

From the repository root:

```bash
cd ecommercefrontend
npm install
npm run dev
```

Frontend default URL:

```text
http://localhost:5173
```

## 15. Summary

This project demonstrates a solid, beginner-friendly layered backend architecture:

- React frontend for UI
- Spring Boot backend for API and logic
- Spring Data JPA and PostgreSQL for persistence
- Spring Security + JWT for authentication
- clean service/controller/repository separation
- exception handling and CORS configuration

It is a practical example of how a modern Java e-commerce application can be organized and how requests flow from the browser to the database and back again.




## 16. API Testing with Bruno and Postman

This repository now includes both API testing collection folders side by side in the root:

- [bruno](bruno) — Bruno collection for Bruno users
- [postman](postman) — Postman-ready export for Postman users

### Bruno

1. Open Bruno.
2. Click Import.
3. Select the [bruno](bruno) folder.
4. Start the backend using the instructions above.
5. Run the Login User request first.
6. Copy the JWT token from the response and paste it into the `token` variable in [bruno/environments/Local.bru](bruno/environments/Local.bru).
7. Run the protected API calls such as Users, Products, Carts, and Orders.

### Postman

1. Open Postman.
2. Click Import.
3. Choose the file [postman/springboot-react-ecommerce-postman.json](postman/springboot-react-ecommerce-postman.json).
4. The collection will be imported with a `baseUrl` variable already set to `http://localhost:8000`.
5. Run the Login User request first to generate the JWT token.
6. Copy the token from the response and paste it into the `token` variable in the Postman collection.
7. Use the same token for all protected requests.
8. For each protected request, the Authorization header is already configured as `Bearer {{token}}`.

### Example Postman import flow

```text
File -> Import -> postman/springboot-react-ecommerce-postman.json
```

### Authentication Notes

- Public endpoint: `/api/users/login`
- Protected endpoints: `/api/users`, `/api/products`, `/api/carts`, `/api/orders`
- Use `Authorization: Bearer <token>` after login for all protected calls.

This gives developers a quick way to test the backend API without writing raw `curl` commands for every request.

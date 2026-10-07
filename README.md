# E-commerce Application
This project is an e-commerce web application built with a Java Spring Boot backend and a React.js frontend. The application aims to provide a full-featured online shopping experience, including user authentication, product browsing, cart management, and secure checkout.

## Features
- User Authentication: Secure login and registration with JWT token-based authentication.
- Product Management: View, search, and filter products.
- Shopping Cart: Add, remove, and update items in the shopping cart.
- Checkout: Secure checkout process with order management.
- Responsive UI: Built with React and styled with Bootstrap for a responsive and user-friendly interface.
## Tech Stack
### Backend
- Java: Core backend language.
- Spring Boot: Framework for building microservices and RESTful APIs.
- JWT: JSON Web Tokens for secure authentication.
- PostgreSQL: Relational database for storing user and product data.
### Frontend
- React.js: JavaScript library for building the user interface.
- React Bootstrap: Provides responsive and accessible UI components.
- Axios: For making HTTP requests to the backend API.
## Setup
1. **Clone the repository:**
```bash 
git clone https://github.com/username/my-ecommerce-app.git 
```
2. **Backend Setup:**

- Navigate to the backend directory.

- Install and start PostgreSQL, create the `ecommerce_backend` database, and follow the schema setup in [`database/README.md`](database/README.md).
- Set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` if your local PostgreSQL connection differs from the defaults.

- Run the application:
```bash 
mvn spring-boot:run
```

3. **Frontend Setup:**

- Navigate to the frontend directory.

- Install dependencies:
```bash
npm install
```
- Start the development server:
```bash
npm start
```
4. **Access the Application:**

- Frontend: http://localhost:3000
- Backend: http://localhost:8000/api
## Usage
- Authentication: Register a new user or log in with existing credentials.
- Product Browsing: Browse available products and view details.
- Cart Management: Add items to the cart and proceed to checkout.
- Profile Management: View and update profile information after logging in.
## Contributions
Feel free to contribute by forking the repository, making your changes, and submitting a pull request.



# Database

This directory contains database reference artifacts for the Spring Boot backend:

- [`schema.sql`](schema.sql): repeatable baseline DDL for a clean MySQL database.
- [`erd.mmd`](erd.mmd): Mermaid ER diagram source for the current JPA model.

## Current Configuration

The backend connects to MySQL using `jdbc:mysql://localhost:3306/ecommerce-backend`. The local defaults in `EcommerceBackend/src/main/resources/application.properties` are username `root` and password `password`; override these for your machine rather than sharing real credentials.

The project currently uses `spring.jpa.hibernate.ddl-auto=update`. Hibernate may create or alter tables when the application starts, but this is not a versioned migration history. The DDL in this folder is a baseline/reference and should be reviewed against the live database before applying it to an existing environment.

## Fresh Database

With MySQL running, execute the script using the MySQL client:

```sh
mysql -u root -p < database/schema.sql
```

Then make sure the datasource settings in `EcommerceBackend/src/main/resources/application.properties` match the local MySQL username and password. Start the backend from the repository root with:

```sh
cd EcommerceBackend
sh ./mvnw spring-boot:run
```

## Model Notes

- `user`, `product`, `cart`, and `orders` are mapped from the JPA entity classes.
- `cart.user_id`, `cart.product_id`, and `orders.user_id` are nullable because the current `@ManyToOne` mappings do not require a relationship.
- String columns use JPA's default `VARCHAR(255)` length; numeric and date types follow the entity field types.
- No uniqueness constraints, cascade rules, or delete actions are declared in the entity model. In particular, `email` is not currently unique at the database level.
- `price` and `total_price` use Java `Double` in the current model. For financial amounts, plan a deliberate migration to `DECIMAL` and a suitable Java decimal type before relying on exact currency arithmetic.

## Schema Change Practice

For local development, keep this baseline aligned with entity changes. Before a schema change in a shared or production environment, take a database backup, write and review a forward migration, test it against a copy of representative data, and deploy the migration before or alongside the application change. This repository does not currently include Flyway or Liquibase, so do not treat `schema.sql` as an ordered migration log.
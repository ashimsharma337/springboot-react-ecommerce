# Database

This directory contains database reference artifacts for the Spring Boot backend:

- [`schema.sql`](schema.sql): repeatable baseline DDL for a clean PostgreSQL database.
- [`seed.sql`](seed.sql): repeatable sample electronics catalog, demo accounts, carts, and orders.
- [`erd.mmd`](erd.mmd): Mermaid ER diagram source for the current JPA model.

## Current Configuration

The backend connects to PostgreSQL using `jdbc:postgresql://localhost:5432/ecommerce_backend`. Hibernate uses the `ecommerce` schema, created by `schema.sql`. The local defaults in `EcommerceBackend/src/main/resources/application.properties` are username `postgres` and password `password`. Override them with the `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` environment variables for your machine; do not commit real credentials.

The project currently uses `spring.jpa.hibernate.ddl-auto=update`. Hibernate may create or alter tables when the application starts, but this is not a versioned migration history. The DDL in this folder is a baseline/reference and should be reviewed against the live database before applying it to an existing environment.

## Fresh Database

With PostgreSQL running, create the database and apply the baseline schema. The `createdb` command creates the database; `schema.sql` creates the `ecommerce` schema and its tables:

```sh
createdb -U postgres ecommerce_backend
psql -U postgres -d ecommerce_backend -f database/schema.sql
psql -U postgres -d ecommerce_backend -f database/seed.sql
```

The seed script adds 8 demo users, 30 electronics products, 12 active cart entries, and 12 sample orders. It can be run again without duplicating those rows and refreshes passwords for its exact demo username/email pairs. All demo accounts share the password `password`; for example, log in as `alexchen` or `techadmin`. These accounts are for local development only; change or remove them before using the database outside local development.

Then make sure the datasource environment variables match your PostgreSQL connection. Start the backend from the repository root with:

```sh
cd EcommerceBackend
sh ./mvnw spring-boot:run
```

## Model Notes

- `app_user`, `product`, `cart`, and `orders` are mapped from the JPA entity classes in the `ecommerce` schema.
- `cart.user_id`, `cart.product_id`, and `orders.user_id` are nullable because the current `@ManyToOne` mappings do not require a relationship.
- String columns use JPA's default `VARCHAR(255)` length; numeric and date types follow the entity field types.
- No uniqueness constraints, cascade rules, or delete actions are declared in the entity model. In particular, `email` is not currently unique at the database level.
- `price` and `total_price` use Java `Double` in the current model. For financial amounts, plan a deliberate migration to `DECIMAL` and a suitable Java decimal type before relying on exact currency arithmetic.

## Schema Change Practice

For local development, keep this baseline aligned with entity changes. Before a schema change in a shared or production environment, take a database backup, write and review a forward migration, test it against a copy of representative data, and deploy the migration before or alongside the application change. This repository does not currently include Flyway or Liquibase, so do not treat `schema.sql` as an ordered migration log.
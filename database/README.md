# Database

These PostgreSQL scripts model the Spring Boot commerce entities and the catalog
data in `ecommercefrontend/src/data`.

## File naming and versioning

The `V` in a filename such as `V001__create_core_tables.sql` means **version**.
It is a naming convention used by database migration tools, not a PostgreSQL
keyword. The digits define the migration's order, and the double underscore
separates the version from its description. A migration tool such as Flyway can
discover these files in its configured migration directory, compare their
versions with its schema history table, and apply only versions that have not
already run.

This repository does not currently configure Flyway or another migration
runner. For now, the `V` prefix helps people identify and order the versioned
schema scripts; when applying them manually in pgAdmin, run the sequence below
once, in order. Do not rerun completed scripts as a way to upgrade a changed
database. A future change should be added as a new, higher-numbered migration.

The current files are organized as follows:

1. [`V001__create_core_tables.sql`](V001__create_core_tables.sql) contains all
   `CREATE TABLE` statements and creates the complete core and storefront schema.
   Columns that may be added to older installations are also included here for
   fresh databases.
2. [`V002__create_alter.sql`](V002__create_alter.sql) contains only `ALTER TABLE`
   statements and guarded constraint additions. It upgrades the original core
   tables without defining or creating tables.
3. [`V003__create_indexes.sql`](V003__create_indexes.sql) adds catalog, lookup,
   and relationship indexes.
4. [`V004__create_functions.sql`](V004__create_functions.sql) creates the shared
   audit timestamp and product slug functions.
5. [`V005__create_triggers.sql`](V005__create_triggers.sql) attaches those
   functions to the relevant tables.
6. [`V006__add_database_comments.sql`](V006__add_database_comments.sql) adds
   descriptions to PostgreSQL metadata for pgAdmin and other database tools.
7. [`V007__add_product_attributes_jsonb.sql`](V007__add_product_attributes_jsonb.sql)
   adds flexible, queryable technical attributes to products. It is safe to run
   after V006 and harmless if V001-V006 have already created the same field/index.

[`seed.sql`](seed.sql) is a repeatable local-development seed script with at
least 50 products, storefront categories, Studio One details, demo users, carts,
and orders; do not use its demo accounts in production.
[`erd.mmd`](erd.mmd) is the ER diagram source.

Catalog columns on `product` store the TypeScript product card data, including the
slug, image/alt text, badge/tone, summary specs, rating/count, availability, audio
series, subcategory, connectivity options, and finishes. PostgreSQL `NUMERIC` is
used for money and ratings, `TEXT` for long descriptions, `BOOLEAN` for flags,
`TIMESTAMPTZ` for audit/review timestamps, and `TEXT[]` for product connectivity
and finish lists. Product details that naturally repeat are normalized into
gallery, specification group/item, box-content, review, storefront-category, and
related-product tables. Category/product links preserve curated storefront order.
`product.attributes` uses `JSONB` for category-specific technical properties
whose keys vary between products (for example, driver size, panel refresh rate,
or connector type); its GIN index supports JSONB containment/path queries.
Structured specification sections remain in their normalized tables rather than
being duplicated in the JSON document. Plain `JSON` is not used because these
application attributes need efficient querying and indexing, not preservation of
the original JSON text formatting or key order.

The current JPA product and order entities use `BigDecimal` for monetary values;
`orders.order_date` remains `TIMESTAMP(6)` to match the backend's `LocalDateTime`.
The original `category` column remains on `product` for compatibility with the
existing API.

## Execute in pgAdmin

Create or select the target database in pgAdmin, open Query Tool, then execute
each numbered migration in order. Run the entire contents of one file, wait for
it to complete successfully, and only then run the next file:

```text
V001__create_core_tables.sql
V002__create_alter.sql
V003__create_indexes.sql
V004__create_functions.sql
V005__create_triggers.sql
V006__add_database_comments.sql
V007__add_product_attributes_jsonb.sql
```

Apply this sequence once to a new database, or to a database containing only the
original four-table schema. V001 creates all tables and includes the full set of
current columns. V002 repeats the required legacy column changes with
`IF NOT EXISTS`, so it also runs successfully after V001 on a fresh database;
it contains no table-creation statements. The sequence is not intended to be
replayed after it has completed: keep a deployment record and do not rerun old
migration files. If a prior version of the expanded schema has already been
applied, inspect the live database and prepare a new forward-only migration
rather than running this sequence over it.

Back up existing data before migrating. V002 converts existing `DOUBLE PRECISION`
prices to two-decimal `NUMERIC`; review unusual legacy values before applying to
shared or production data. V007 also works as a standalone forward migration for
a database that has already completed V006. Run `seed.sql` after V007 for local
development only.

For command-line use, the same files can be applied with `psql -f` one at a time
in the listed order. The backend connects to
`jdbc:postgresql://localhost:5432/ecommerce_backend`.

The Spring datasource can be configured with `DB_URL`, `DB_USERNAME`, and
`DB_PASSWORD`; local defaults are in
[`application.properties`](../EcommerceBackend/src/main/resources/application.properties).
Hibernate currently uses `ddl-auto=update`; the numbered scripts are the explicit
manual migration path. For automated production deployments, use Flyway or
Liquibase to track applied migration versions rather than manually replaying SQL.

The seed contains development-only accounts that share the password
`password`. Change or remove them before using the database outside local
development.

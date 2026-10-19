-- Adds descriptions to database objects for pgAdmin and PostgreSQL catalog users.
BEGIN;

-- User table and index comments
COMMENT ON TABLE ecommerce.app_user IS 'Application accounts and authentication data.';

-- Product table and index comments
COMMENT ON TABLE ecommerce.product IS 'Products, storefront card fields, inventory, and catalog metadata.';
COMMENT ON COLUMN ecommerce.product.price IS 'Product price stored as an exact two-decimal currency amount.';
COMMENT ON COLUMN ecommerce.product.slug IS 'URL-friendly product identifier; generated from the product name when omitted.';
COMMENT ON COLUMN ecommerce.product.attributes IS 'Category-specific product attributes stored as a queryable JSONB object.';
COMMENT ON COLUMN ecommerce.product.connectivities IS 'Supported connectivity options stored as a PostgreSQL text array.';
COMMENT ON COLUMN ecommerce.product.finishes IS 'Available product finishes stored as a PostgreSQL text array.';
COMMENT ON COLUMN ecommerce.product.in_stock IS 'Whether the product is currently offered as in stock.';
COMMENT ON COLUMN ecommerce.product.noise_cancelling IS 'Noise-cancelling capability; NULL when not specified.';
COMMENT ON INDEX ecommerce.product_slug_unique IS 'Unique lookup index for non-null product slugs.';
COMMENT ON INDEX ecommerce.product_category_idx IS 'Supports product catalog filtering by category.';
COMMENT ON INDEX ecommerce.product_subcategory_idx IS 'Supports product catalog filtering by subcategory.';
COMMENT ON INDEX ecommerce.product_series_idx IS 'Supports product catalog filtering by series.';
COMMENT ON INDEX ecommerce.product_attributes_gin_idx IS 'Supports containment and JSON path queries on product attributes.';
COMMENT ON INDEX ecommerce.product_available_idx IS 'Supports product availability and stock filtering.';
COMMENT ON INDEX ecommerce.product_connectivities_gin_idx IS 'Supports containment searches over product connectivity arrays.';
COMMENT ON INDEX ecommerce.product_finishes_gin_idx IS 'Supports containment searches over product finish arrays.';

-- Cart table and index comments
COMMENT ON TABLE ecommerce.cart IS 'Products selected by users before checkout.';
COMMENT ON INDEX ecommerce.cart_user_status_idx IS 'Supports cart lookup by user and cart status.';
COMMENT ON INDEX ecommerce.cart_product_idx IS 'Supports cart lookup by product.';

-- Order table and index comments
COMMENT ON TABLE ecommerce.orders IS 'Orders placed by application users.';
COMMENT ON INDEX ecommerce.orders_user_date_idx IS 'Supports newest-first order history lookup by user.';

-- Storefront category table and index comments
COMMENT ON TABLE ecommerce.storefront_category IS 'Curated category cards shown on the storefront.';
COMMENT ON TABLE ecommerce.storefront_category_product IS 'Ordered many-to-many links between storefront categories and products.';
COMMENT ON INDEX ecommerce.storefront_category_product_order_idx IS 'Supports ordered product listing within a category.';
COMMENT ON INDEX ecommerce.storefront_category_product_product_idx IS 'Supports reverse lookup of categories containing a product.';

-- Product detail table comments
COMMENT ON TABLE ecommerce.product_gallery IS 'Ordered product images with accessible alt text and labels.';
COMMENT ON TABLE ecommerce.product_specification_group IS 'Ordered specification sections belonging to a product.';
COMMENT ON TABLE ecommerce.product_specification IS 'Individual product specification name and value pairs.';
COMMENT ON TABLE ecommerce.product_box_content IS 'Ordered list of items included in a product package.';
COMMENT ON TABLE ecommerce.related_product IS 'Ordered product-to-product recommendations.';
COMMENT ON INDEX ecommerce.related_product_reverse_idx IS 'Supports reverse lookup of product recommendations.';

-- Product review table and index comments
COMMENT ON TABLE ecommerce.product_review IS 'Customer reviews displayed on product detail pages.';
COMMENT ON INDEX ecommerce.product_review_recent_idx IS 'Supports newest-first reviews for a product.';
COMMENT ON INDEX ecommerce.product_review_user_idx IS 'Supports review lookup by registered user.';

-- Function comments
COMMENT ON FUNCTION ecommerce.set_updated_at() IS 'Sets updated_at to the current timestamp before row updates.';
COMMENT ON FUNCTION ecommerce.generate_product_slug() IS 'Generates a URL-friendly product slug when a slug is omitted.';

-- Trigger comments
COMMENT ON TRIGGER app_user_set_updated_at ON ecommerce.app_user IS 'Refreshes account updated_at before updates.';
COMMENT ON TRIGGER product_generate_slug ON ecommerce.product IS 'Generates a product slug when the slug is blank.';
COMMENT ON TRIGGER product_set_updated_at ON ecommerce.product IS 'Refreshes product updated_at before updates.';
COMMENT ON TRIGGER cart_set_updated_at ON ecommerce.cart IS 'Refreshes cart updated_at before updates.';
COMMENT ON TRIGGER orders_set_updated_at ON ecommerce.orders IS 'Refreshes order updated_at before updates.';
COMMENT ON TRIGGER storefront_category_set_updated_at ON ecommerce.storefront_category IS 'Refreshes category updated_at before updates.';

COMMIT;

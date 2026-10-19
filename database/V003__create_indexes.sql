-- Creates indexes that support common catalog, cart, order, and detail-page queries.
BEGIN;

-- Product indexes
-- Finds products by their public URL slug while allowing products without a slug.
CREATE UNIQUE INDEX product_slug_unique ON ecommerce.product (slug) WHERE slug IS NOT NULL;
-- Filters the catalog by its primary category.
CREATE INDEX product_category_idx ON ecommerce.product (category);
-- Filters the catalog by audio or product subcategory.
CREATE INDEX product_subcategory_idx ON ecommerce.product (subcategory);
-- Filters products by product series.
CREATE INDEX product_series_idx ON ecommerce.product (series);
-- Searches structured product-specific attributes using JSONB containment and path operators.
CREATE INDEX product_attributes_gin_idx ON ecommerce.product USING GIN (attributes jsonb_path_ops);
-- Filters products by availability and remaining stock.
CREATE INDEX product_available_idx ON ecommerce.product (in_stock, stock);
-- Searches product connectivity arrays using containment operations.
CREATE INDEX product_connectivities_gin_idx ON ecommerce.product USING GIN (connectivities);
-- Searches product finish arrays using containment operations.
CREATE INDEX product_finishes_gin_idx ON ecommerce.product USING GIN (finishes);

-- Cart indexes
-- Finds a user's cart rows by cart status.
CREATE INDEX cart_user_status_idx ON ecommerce.cart (user_id, status);
-- Finds carts that contain a selected product.
CREATE INDEX cart_product_idx ON ecommerce.cart (product_id);

-- Order indexes
-- Loads one user's order history from newest to oldest.
CREATE INDEX orders_user_date_idx ON ecommerce.orders (user_id, order_date DESC);

-- Storefront category indexes
-- Loads products within a category in their configured display order.
CREATE INDEX storefront_category_product_order_idx ON ecommerce.storefront_category_product (category_id, display_order);
-- Finds all storefront categories that contain a product.
CREATE INDEX storefront_category_product_product_idx ON ecommerce.storefront_category_product (product_id);

-- Product review indexes
-- Loads a product's reviews from newest to oldest.
CREATE INDEX product_review_recent_idx ON ecommerce.product_review (product_id, reviewed_at DESC);
-- Finds reviews written by a registered user.
CREATE INDEX product_review_user_idx ON ecommerce.product_review (user_id) WHERE user_id IS NOT NULL;

-- Related product indexes
-- Finds products that recommend a given product.
CREATE INDEX related_product_reverse_idx ON ecommerce.related_product (related_product_id);

COMMIT;

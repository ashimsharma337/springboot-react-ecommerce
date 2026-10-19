-- V005: Attaches audit and catalog behavior to the tables that need it.
BEGIN;

-- User triggers
-- Refreshes account audit time whenever an account row changes.
CREATE TRIGGER app_user_set_updated_at
    BEFORE UPDATE ON ecommerce.app_user
    FOR EACH ROW EXECUTE FUNCTION ecommerce.set_updated_at();

-- Product triggers
-- Generates a URL-friendly slug when a product does not provide one.
CREATE TRIGGER product_generate_slug
    BEFORE INSERT OR UPDATE OF name, slug ON ecommerce.product
    FOR EACH ROW EXECUTE FUNCTION ecommerce.generate_product_slug();
-- Refreshes product audit time whenever a product row changes.
CREATE TRIGGER product_set_updated_at
    BEFORE UPDATE ON ecommerce.product
    FOR EACH ROW EXECUTE FUNCTION ecommerce.set_updated_at();

-- Cart triggers
-- Refreshes cart audit time whenever a cart row changes.
CREATE TRIGGER cart_set_updated_at
    BEFORE UPDATE ON ecommerce.cart
    FOR EACH ROW EXECUTE FUNCTION ecommerce.set_updated_at();

-- Order triggers
-- Refreshes order audit time whenever an order row changes.
CREATE TRIGGER orders_set_updated_at
    BEFORE UPDATE ON ecommerce.orders
    FOR EACH ROW EXECUTE FUNCTION ecommerce.set_updated_at();

-- Storefront category triggers
-- Refreshes category audit time whenever a category row changes.
CREATE TRIGGER storefront_category_set_updated_at
    BEFORE UPDATE ON ecommerce.storefront_category
    FOR EACH ROW EXECUTE FUNCTION ecommerce.set_updated_at();

COMMIT;

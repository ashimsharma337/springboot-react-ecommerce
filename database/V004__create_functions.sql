-- V004: Creates shared functions used by the audit and product-catalog triggers.
BEGIN;

-- Refreshes updated_at before a mutable row is saved.
CREATE FUNCTION ecommerce.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Creates a URL-friendly product slug when a product is saved without one.
CREATE FUNCTION ecommerce.generate_product_slug()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF NEW.slug IS NULL OR BTRIM(NEW.slug) = '' THEN
        NEW.slug := NULLIF(
            TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER(BTRIM(NEW.name)), '[^a-z0-9]+', '-', 'g')),
            ''
        );
    END IF;

    RETURN NEW;
END;
$$;

COMMIT;

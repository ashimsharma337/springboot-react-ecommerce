-- Adds catalog columns to databases whose core tables predate the storefront schema.
BEGIN;

-- Adds account audit timestamps when upgrading the original app_user table.
ALTER TABLE ecommerce.app_user
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Converts product currency to exact decimals and adds storefront/product metadata.
ALTER TABLE ecommerce.product
    ALTER COLUMN price TYPE NUMERIC(12, 2) USING ROUND(price::NUMERIC, 2),
    ALTER COLUMN name TYPE VARCHAR(255),
    ALTER COLUMN description TYPE TEXT,
    ALTER COLUMN category TYPE VARCHAR(255),
    ADD COLUMN IF NOT EXISTS slug VARCHAR(160),
    ADD COLUMN IF NOT EXISTS image_url TEXT,
    ADD COLUMN IF NOT EXISTS image_alt TEXT,
    ADD COLUMN IF NOT EXISTS rating NUMERIC(2, 1),
    ADD COLUMN IF NOT EXISTS review_count INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS badge VARCHAR(80),
    ADD COLUMN IF NOT EXISTS badge_tone VARCHAR(16),
    ADD COLUMN IF NOT EXISTS specs TEXT,
    ADD COLUMN IF NOT EXISTS series VARCHAR(80),
    ADD COLUMN IF NOT EXISTS subcategory VARCHAR(120),
    ADD COLUMN IF NOT EXISTS attributes JSONB NOT NULL DEFAULT '{}'::JSONB
        CONSTRAINT product_attributes_object CHECK (jsonb_typeof(attributes) = 'object'),
    ADD COLUMN IF NOT EXISTS connectivities TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS finishes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS noise_cancelling BOOLEAN,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Adds a rating constraint only when upgrading a schema that does not already have it.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'product_rating_range'
          AND conrelid = 'ecommerce.product'::regclass
    ) THEN
        ALTER TABLE ecommerce.product
            ADD CONSTRAINT product_rating_range CHECK (rating BETWEEN 0 AND 5);
    END IF;
END $$;

-- Adds a badge tone constraint only when upgrading a schema that does not already have it.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'product_badge_tone_values'
          AND conrelid = 'ecommerce.product'::regclass
    ) THEN
        ALTER TABLE ecommerce.product
            ADD CONSTRAINT product_badge_tone_values
            CHECK (badge_tone IN ('blue', 'neutral', 'dark', 'sky'));
    END IF;
END $$;

-- Adds cart audit timestamps when upgrading the original cart table.
ALTER TABLE ecommerce.cart
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Converts order currency to exact decimals and adds audit timestamps.
ALTER TABLE ecommerce.orders
    ALTER COLUMN total_price TYPE NUMERIC(12, 2) USING ROUND(total_price::NUMERIC, 2),
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

COMMIT;

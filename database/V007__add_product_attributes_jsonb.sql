-- Adds flexible category-specific attributes for databases already migrated through V006.
BEGIN;

-- Stores queryable technical attributes that vary across product categories.
ALTER TABLE ecommerce.product
    ADD COLUMN IF NOT EXISTS attributes JSONB NOT NULL DEFAULT '{}'::JSONB
        CONSTRAINT product_attributes_object CHECK (jsonb_typeof(attributes) = 'object');

-- Enforces object-shaped JSONB for databases where the column already existed.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'product_attributes_object'
          AND conrelid = 'ecommerce.product'::regclass
    ) THEN
        ALTER TABLE ecommerce.product
            ADD CONSTRAINT product_attributes_object
            CHECK (jsonb_typeof(attributes) = 'object');
    END IF;
END $$;

-- Supports containment and JSON path searches on structured product attributes.
CREATE INDEX IF NOT EXISTS product_attributes_gin_idx
    ON ecommerce.product USING GIN (attributes jsonb_path_ops);

-- Describes the flexible product attributes field in PostgreSQL metadata.
COMMENT ON COLUMN ecommerce.product.attributes IS
    'Category-specific product attributes stored as a queryable JSONB object.';

-- Documents the index used to query structured product attributes.
COMMENT ON INDEX ecommerce.product_attributes_gin_idx IS
    'Supports containment and JSON path queries on product attributes.';

COMMIT;

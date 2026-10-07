BEGIN;

INSERT INTO ecommerce.app_user (username, email, password, role)
SELECT seed.username, seed.email, seed.password, seed.role
FROM (
    VALUES
        ('techadmin', 'admin@techshop.example', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO', 'ROLE_ADMIN'),
        ('alexchen', 'alex.chen@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO', 'ROLE_USER'),
        ('jordanlee', 'jordan.lee@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO', 'ROLE_USER'),
        ('samrivera', 'sam.rivera@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO', 'ROLE_USER'),
        ('morganpatel', 'morgan.patel@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO', 'ROLE_USER'),
        ('taylorbrooks', 'taylor.brooks@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO', 'ROLE_USER'),
        ('caseywright', 'casey.wright@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO', 'ROLE_USER'),
        ('rileykim', 'riley.kim@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO', 'ROLE_USER')
) AS seed(username, email, password, role)
WHERE NOT EXISTS (
    SELECT 1
    FROM ecommerce.app_user existing
    WHERE existing.username = seed.username OR existing.email = seed.email
);

UPDATE ecommerce.app_user AS existing
SET password = seed.password
FROM (
        VALUES
                ('techadmin', 'admin@techshop.example', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO'),
                ('alexchen', 'alex.chen@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO'),
                ('jordanlee', 'jordan.lee@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO'),
                ('samrivera', 'sam.rivera@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO'),
                ('morganpatel', 'morgan.patel@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO'),
                ('taylorbrooks', 'taylor.brooks@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO'),
                ('caseywright', 'casey.wright@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO'),
                ('rileykim', 'riley.kim@example.com', '$2a$10$9baHU19y9CvDMPLahIhByOWwyubObQgOl/uokeTDZcm/uzlV7YrJO')
) AS seed(username, email, password)
WHERE existing.username = seed.username
    AND existing.email = seed.email;

INSERT INTO ecommerce.product (name, price, description, stock, category)
SELECT seed.name, seed.price, seed.description, seed.stock, seed.category
FROM (
    VALUES
        ('Aster 14 Laptop', 1099.99, '14-inch ultrabook with 16 GB memory and 1 TB SSD', 18, 'Laptops'),
        ('Aster Pro 16 Laptop', 1899.00, '16-inch creator laptop with 32 GB memory and RTX graphics', 9, 'Laptops'),
        ('ByteBook Air 13', 999.00, 'Lightweight 13-inch laptop with 512 GB SSD', 24, 'Laptops'),
        ('Forge Gaming Laptop 15', 1599.99, '144 Hz gaming laptop with RTX 4070 graphics', 11, 'Laptops'),
        ('Nova Mini Desktop', 799.00, 'Compact desktop with 8-core processor and 1 TB SSD', 14, 'Desktops'),
        ('Vector Workstation Tower', 2499.00, 'Workstation desktop with 64 GB memory and RTX graphics', 5, 'Desktops'),
        ('PixelView 27 4K Monitor', 529.99, '27-inch IPS display with 4K resolution and USB-C', 22, 'Monitors'),
        ('PixelView UltraWide 34', 749.00, '34-inch curved ultrawide display with 144 Hz refresh rate', 8, 'Monitors'),
        ('ClearCall 24 Webcam', 89.99, '1080p webcam with dual microphones and privacy shutter', 35, 'Accessories'),
        ('StudioBeam 4K Webcam', 179.00, '4K webcam with autofocus and HDR support', 16, 'Accessories'),
        ('Keycraft Mechanical Keyboard', 129.99, 'Hot-swappable mechanical keyboard with tactile switches', 28, 'Accessories'),
        ('Keycraft Low-Profile Keyboard', 99.00, 'Wireless low-profile keyboard with multi-device pairing', 31, 'Accessories'),
        ('Glide Wireless Mouse', 59.99, 'Ergonomic wireless mouse with adjustable tracking', 42, 'Accessories'),
        ('Precision Pro Mouse', 109.00, 'High-precision wireless mouse with programmable controls', 17, 'Accessories'),
        ('Arc ANC Headphones', 249.99, 'Over-ear headphones with adaptive noise cancellation', 19, 'Audio'),
        ('Pulse Wireless Earbuds', 129.00, 'Compact earbuds with noise reduction and charging case', 33, 'Audio'),
        ('Reference USB-C Microphone', 159.99, 'Cardioid USB microphone for streaming and calls', 13, 'Audio'),
        ('RoomTone Desktop Speakers', 219.00, 'Powered stereo speakers with USB-C and Bluetooth input', 10, 'Audio'),
        ('ThunderDock 12-in-1', 189.99, 'USB-C dock with dual display, Ethernet, and card reader', 21, 'Accessories'),
        ('SwiftDock 7-in-1', 79.00, 'Portable USB-C hub with HDMI and 100 W pass-through', 37, 'Accessories'),
        ('Vault NVMe SSD 1 TB', 109.99, 'PCIe 4.0 NVMe solid-state drive with heatsink', 26, 'Storage'),
        ('Vault NVMe SSD 2 TB', 189.99, 'High-speed PCIe 4.0 NVMe solid-state drive', 15, 'Storage'),
        ('Pocket SSD 2 TB', 169.00, 'Portable USB-C solid-state drive with rugged enclosure', 20, 'Storage'),
        ('MeshWave Wi-Fi 6 Router', 199.99, 'Dual-band mesh router with coverage for large homes', 12, 'Networking'),
        ('LinkPro 2.5G Switch', 119.00, 'Eight-port unmanaged 2.5 Gigabit Ethernet switch', 7, 'Networking'),
        ('StreamCast 4K', 69.99, '4K streaming device with voice remote and Wi-Fi 6', 40, 'Smart Home'),
        ('HomeSense Starter Kit', 149.00, 'Smart hub with two lights and motion sensor', 18, 'Smart Home'),
        ('ChargeGrid 100 W GaN Charger', 79.99, 'Four-port compact charger with USB-C Power Delivery', 50, 'Power'),
        ('TravelPower 20K', 89.00, '20,000 mAh power bank with 65 W USB-C output', 29, 'Power'),
        ('SurgeSafe 8-Outlet Strip', 49.99, 'Surge-protected power strip with USB charging ports', 34, 'Power')
) AS seed(name, price, description, stock, category)
WHERE NOT EXISTS (
    SELECT 1
    FROM ecommerce.product existing
    WHERE existing.name = seed.name
);

INSERT INTO ecommerce.cart (user_id, product_id, quantity, status)
SELECT app_user.user_id, product.product_id, seed.quantity, 'ACTIVE'
FROM (
    VALUES
        ('alexchen', 'Aster 14 Laptop', 1),
        ('alexchen', 'ThunderDock 12-in-1', 1),
        ('jordanlee', 'Forge Gaming Laptop 15', 1),
        ('jordanlee', 'Arc ANC Headphones', 1),
        ('samrivera', 'PixelView 27 4K Monitor', 2),
        ('samrivera', 'Keycraft Mechanical Keyboard', 1),
        ('morganpatel', 'Vault NVMe SSD 2 TB', 1),
        ('morganpatel', 'Glide Wireless Mouse', 1),
        ('taylorbrooks', 'Pulse Wireless Earbuds', 2),
        ('caseywright', 'MeshWave Wi-Fi 6 Router', 1),
        ('rileykim', 'StudioBeam 4K Webcam', 1),
        ('rileykim', 'ChargeGrid 100 W GaN Charger', 1)
) AS seed(username, product_name, quantity)
JOIN ecommerce.app_user app_user ON app_user.username = seed.username
JOIN ecommerce.product product ON product.name = seed.product_name
WHERE NOT EXISTS (
    SELECT 1
    FROM ecommerce.cart existing
    WHERE existing.user_id = app_user.user_id
      AND existing.product_id = product.product_id
      AND existing.status = 'ACTIVE'
);

INSERT INTO ecommerce.orders (user_id, total_price, order_date, status)
SELECT app_user.user_id, seed.total_price, seed.order_date, seed.status
FROM (
    VALUES
        ('alexchen', 1189.98, TIMESTAMP '2026-01-18 14:22:00', 'DELIVERED'),
        ('alexchen', 249.99, TIMESTAMP '2026-03-06 09:15:00', 'DELIVERED'),
        ('jordanlee', 1599.99, TIMESTAMP '2026-02-11 18:40:00', 'SHIPPED'),
        ('jordanlee', 129.00, TIMESTAMP '2026-04-02 11:05:00', 'DELIVERED'),
        ('samrivera', 529.99, TIMESTAMP '2026-02-24 16:30:00', 'DELIVERED'),
        ('samrivera', 398.99, TIMESTAMP '2026-05-12 13:10:00', 'PROCESSING'),
        ('morganpatel', 299.98, TIMESTAMP '2026-03-19 10:45:00', 'DELIVERED'),
        ('morganpatel', 189.99, TIMESTAMP '2026-06-03 15:20:00', 'SHIPPED'),
        ('taylorbrooks', 219.00, TIMESTAMP '2026-04-16 12:00:00', 'DELIVERED'),
        ('caseywright', 199.99, TIMESTAMP '2026-05-27 08:35:00', 'PROCESSING'),
        ('rileykim', 259.00, TIMESTAMP '2026-06-14 17:55:00', 'SHIPPED'),
        ('rileykim', 89.00, TIMESTAMP '2026-07-01 10:25:00', 'CANCELLED')
) AS seed(username, total_price, order_date, status)
JOIN ecommerce.app_user app_user ON app_user.username = seed.username
WHERE NOT EXISTS (
    SELECT 1
    FROM ecommerce.orders existing
    WHERE existing.user_id = app_user.user_id
      AND existing.order_date = seed.order_date
);

COMMIT;
-- Seeds 50+ development products and related storefront data; do not use demo accounts in production.
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

-- Adds storefront category cards from ecommercefrontend/src/data/storefront.ts.
INSERT INTO ecommerce.storefront_category
    (slug, name, eyebrow, description, unit_label, image_url, display_order)
VALUES
    ('premium-audio', 'Premium Audio', 'Tier 01 • Acoustics',
     'Monitors, open-back studio planars, and discrete DAC modules.',
     '14 HARDWARE UNITS',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuBRH51k-UFfJWXJCHNPhirypmPoXDHbdNsU3hieOSNHjwu_7Q49CKK3IV7SYwGJHu3gXo3Id_RKcIPPnI98DxCVURUUsN2VeIm7a65nmO3GDKomnEWtQWRbEIbmS0tQSRcpP0qN82sZjRXEKGkZlCPF3Jc8Cpmn99T6ViYXK2ZrQxxnPAhSUjGjDg2tdtEqJ6p0VpW1CUNCkUfS2rOhKLvutx6vQI8zzzfOuBiUABz2UzU37nwewNimqg', 1),
    ('studio-computing', 'Studio Computing', 'Tier 02 • Compute',
     'High-bandwidth workstations, NVMe hubs, and thermal chassis.',
     '08 HARDWARE UNITS',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ddJBHuaPRnRdh-Yh29k1Z3GEaX9XqiQA0U2DM7gaQx8bPoY3nDytIZByU3ASTBWTJlSj4U4aoI2XqP9iUl3gMaJtS2mhD-uXCbSOrBu911BthIXef2pG4WQihwBG_L6RfygyCrrPopBZ9VASjxIyMQNvh3b13K2mJ4H2vluFCoFwPsEHATISVsFHoXSJQ1J9dbMcLkBFmbRX6ylb74XwUA21Y_QIXtxPR_HsLEZ1jjwXRkEGY4LQww', 2),
    ('ultrawide-displays', '4K Ultrawide Displays', 'Tier 03 • Visual',
     'Calibrated DCI-P3 panels with an integrated 96W Thunderbolt hub.',
     '05 HARDWARE UNITS',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuCetNKnND_bbZI-we0o5YU_u5e5X4tCDPCX-4YDS4JF74LsxnjDGvcO0HTl2LVQ2rA_s7T7KS9Tw4OhucqcLq4dYLpmgqB1fCbpeXnj6rqjTslgMxF4ho60ehFkG3SYzVd1QohoZ7vHmSNwBmD8j2fSMYNn9wOBTQ6k96RUT61MfuStKgNt9CpUb-O2mb8PsX-xKtDiFcgPA8pQsmtpoomY7Pmw2ZpIU1tU4lo_pBKvscwH9QnG21xu0A', 3),
    ('desk-setup-accessories', 'Desk Setup Accessories', 'Tier 04 • Modular',
     'Magnetic routing links, mechanical keys, and solid brass rests.',
     '22 HARDWARE UNITS',
     'https://lh3.googleusercontent.com/aida-public/AB6AXuDSensA5pUcq3smRpD-mEWwBWapwusr2lUH3sZ6PrbdH1SK3GyzW1ACdKscYFm35yX2oynP85MXh69hBJR6IrfBtPfAz_ZyQObtSyWZF9f0aP0Onxoi6HoaT_CG8nxtlUQTSC2kChxkVp3F3-R9sPWirKcmrGGAE1PuIe4dcI8OnV6Oa773m6fj2hfLeBFZPyzYvXW_xIpaGwvsoTFGJuA-r20XWlXfR-ARvEYd39MAGj1-Bwzgn7ZWkA', 4)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    eyebrow = EXCLUDED.eyebrow,
    description = EXCLUDED.description,
    unit_label = EXCLUDED.unit_label,
    image_url = EXCLUDED.image_url,
    display_order = EXCLUDED.display_order;

-- Adds 20 curated storefront products; together with the 30 general products above this seeds at least 50 products.
WITH seed_products (
    slug, name, category, subcategory, description, price, rating, review_count,
    badge, badge_tone, specs, series, connectivities, finishes, stock, in_stock,
    noise_cancelling, attributes
) AS (
    VALUES
        ('studio-one-headphone', 'NEXUS Studio One', 'Audio & Acoustics', 'Over-Ear Monitors',
         'Closed-back reference monitor featuring a custom acoustic chamber and zero-compression DSP bypass.',
         349.00, 4.9, 428, 'FLAGSHIP TIER', 'blue', '5Hz–48kHz • 32Ω • THD <0.05%',
         '01-FLAGSHIP',
         ARRAY['Bluetooth 5.3 LE Audio', 'USB-C 32-bit Lossless', '3.5mm / 4.4mm Balanced']::TEXT[],
         ARRAY['Matte Black', 'Lunar Silver', 'Raw Aluminum', 'Deep Navy']::TEXT[],
         24, TRUE, FALSE,
         '{"driver_size_mm":40,"impedance_ohms":32,"frequency_response":"5Hz–48kHz","thd_percent":0.05}'::JSONB),
        ('aero-wireless-anc', 'Aero Wireless ANC', 'Audio & Acoustics', 'Over-Ear Monitors',
         'Hybrid 4-mic active noise cancellation with 48-hour playback and multipoint Bluetooth switching.',
         279.00, 4.8, 186, 'ACTIVE NOISE CANCEL', 'dark', '42dB ANC • 48hr Battery • LDAC',
         'AERO-PORTABLE',
         ARRAY['Bluetooth 5.3 LE Audio', 'USB-C 32-bit Lossless']::TEXT[],
         ARRAY['Lunar Silver', 'Deep Navy']::TEXT[],
         4, TRUE, TRUE,
         '{"noise_cancellation_depth_db":42,"battery_life_hours":48,"microphones":4}'::JSONB),
        ('reference-pro-open-back', 'Reference Pro Open-Back', 'Audio & Acoustics', 'Over-Ear Monitors',
         'Acoustically transparent stainless grilles for spatial soundstaging and mastering precision.',
         449.00, 4.9, 97, 'MASTERING GRADE', 'neutral', '53mm Planar • 80Ω • Open Acoustic',
         'PRO-MONITOR',
         ARRAY['3.5mm / 4.4mm Balanced']::TEXT[],
         ARRAY['Raw Aluminum', 'Matte Black']::TEXT[],
         12, TRUE, NULL,
         '{"driver_size_mm":53,"impedance_ohms":80,"acoustic_design":"open-back planar"}'::JSONB),
        ('linear-core-dac-amp', 'Linear Core DAC Amp', 'Audio & Acoustics', 'DAC / Headphone Amps',
         'Fully balanced dual-mono architecture with 768kHz/32-bit PCM decoding and 4.4mm Pentaconn out.',
         189.00, 4.8, 73, 'LOSSLESS PROCESSING', 'blue', '32-bit / 768kHz • 1200mW • SNR 128dB',
         'DESK-CORE',
         ARRAY['USB-C 32-bit Lossless', '3.5mm / 4.4mm Balanced']::TEXT[],
         ARRAY['Matte Black', 'Raw Aluminum']::TEXT[],
         18, TRUE, NULL,
         '{"pcm_max_sample_rate_khz":768,"dac_bit_depth":32,"output_power_mw":1200}'::JSONB),
        ('pod-studio-mic', 'Pod Studio Mic', 'Audio & Acoustics', 'Studio Microphones',
         'Gold-sputtered condenser capsule with dual USB-C/XLR output and magnetic shock suspension.',
         159.00, 4.7, 59, 'BROADCASTING', 'neutral', 'XLR + USB-C • 24-bit/192kHz',
         'CAPTURE-VOX',
         ARRAY['USB-C 32-bit Lossless', 'XLR']::TEXT[],
         ARRAY['Matte Black']::TEXT[],
         13, TRUE, NULL,
         '{"microphone_type":"condenser","outputs":["USB-C","XLR"],"sample_rate_khz":192}'::JSONB),
        ('spatial-audio-soundbar', 'Spatial Audio Soundbar', 'Audio & Acoustics', 'Desktop Speakers',
         'Compact spatial transducer creating a localized binaural field for non-headphone mixing sessions.',
         529.00, 4.8, 42, 'DOLBY ATMOS BEAM', 'dark', '7-driver array • 180W • HDMI eARC',
         'DESK-ARRAY',
         ARRAY['USB-C 32-bit Lossless', 'HDMI eARC']::TEXT[],
         ARRAY['Matte Black', 'Deep Navy']::TEXT[],
         2, TRUE, NULL,
         '{"driver_count":7,"amplifier_power_watts":180,"hdmi":"eARC"}'::JSONB),
        ('acoustic-desk-pads', 'Acoustic Desk Pads', 'Audio & Acoustics', 'Desk & Cable Accessories',
         'High-density felt and Sorbothane pads dampen desktop reflections and chassis vibration.',
         49.00, 4.6, 34, 'ISOLATION BASE', 'sky', '900 × 400mm • 4mm • Water-repellent',
         'ISO-DECK', ARRAY[]::TEXT[],
         ARRAY['Matte Black', 'Lunar Silver']::TEXT[],
         40, TRUE, NULL,
         '{"width_mm":900,"depth_mm":400,"thickness_mm":4,"water_repellent":true}'::JSONB),
        ('titanium-cable-2m', 'Titanium Cable 2M', 'Audio & Acoustics', 'Desk & Cable Accessories',
         'Monocrystalline copper braid with interchangeable balanced 4.4mm and 3.5mm gold terminations.',
         39.00, 4.7, 28, 'MODULAR JACK', 'neutral', '2m • 8-core braid • Swappable plugs',
         'INTERCONNECT',
         ARRAY['3.5mm / 4.4mm Balanced']::TEXT[],
         ARRAY['Matte Black', 'Raw Aluminum']::TEXT[],
         55, TRUE, NULL,
         '{"length_meters":2,"conductor":"monocrystalline copper","core_count":8}'::JSONB),
        ('store-studio-one-headphone', 'Studio One Headphone', 'Audio & Sound', 'Headphones',
         'Adaptive hybrid noise cancellation and studio-grade, lossless wireless sound.',
         349.00, 4.9, 128, 'FLAGSHIP', 'blue', '40mm Beryllium • 55hr Battery',
         '01-FLAGSHIP',
         ARRAY['Bluetooth', 'USB-C', '3.5mm']::TEXT[],
         ARRAY['Matte Black', 'Titanium']::TEXT[],
         20, TRUE, TRUE,
         '{"driver_size_mm":40,"battery_life_hours":55,"material":"beryllium"}'::JSONB),
        ('mach-64-m2-enclosure', 'Mach-64 M.2 Enclosure', 'Computing', 'Storage',
         'Passive convective cooling and sustained 3,800 MB/s transfer speeds.',
         129.00, 4.8, 92, 'NEW RELEASE', 'neutral', 'USB4 • 40Gbps Transfer',
         'MACH-64', ARRAY['USB4']::TEXT[],
         ARRAY['Natural Aluminum', 'Matte Black']::TEXT[],
         28, TRUE, NULL,
         '{"interface":"USB4","transfer_rate_mbps":3800,"cooling":"passive"}'::JSONB),
        ('horizon-34-curved-monitor', 'Horizon 34" Curved Monitor', 'Displays', 'Ultrawide Monitors',
         '3440 × 1440 resolution with single-cable Thunderbolt 96W power delivery.',
         899.00, 5.0, 310, 'BESTSELLER', 'dark', '165Hz • 99% DCI-P3 Nano-IPS',
         'HORIZON', ARRAY['Thunderbolt']::TEXT[],
         ARRAY['Graphite']::TEXT[],
         10, TRUE, NULL,
         '{"diagonal_inches":34,"resolution":"3440x1440","refresh_rate_hz":165,"power_delivery_watts":96}'::JSONB),
        ('haptic-mechanical-keyboard', 'Haptic Mechanical Keyboard', 'Accessories', 'Keyboards',
         'Silent tactile switches with a hot-swappable, gasket-mounted PCB.',
         199.00, 4.9, 245, 'STUDIO SERIES', 'sky', 'Hot-Swap • Gasket Mount',
         'HAPTIC', ARRAY['USB-C', 'Bluetooth']::TEXT[],
         ARRAY['Graphite']::TEXT[],
         32, TRUE, NULL,
         '{"switch_type":"silent tactile","hot_swappable":true,"mount":"gasket"}'::JSONB),
        ('desk-stand-pro', 'Desk Stand Pro', 'Accessories', 'Desk & Cable Accessories',
         'Weighted solid aluminum pedestal with integral silicone cable guide.',
         89.00, 4.8, 64, 'AEROSPACE ALLOY', 'neutral', 'Solid Milled Aluminum',
         'DESK-ESSENTIALS', ARRAY[]::TEXT[],
         ARRAY['Silver']::TEXT[],
         26, TRUE, NULL,
         '{"material":"milled aluminum","cable_guide":true}'::JSONB),
        ('nexus-core-dac-amp', 'NEXUS Core DAC Amp', 'Audio & Acoustics', 'DAC / Headphone Amps',
         'Bit-perfect 32-bit/768kHz decoder with 4.4mm balanced audio output.',
         179.00, 4.9, 51, 'ESS SABRE 9038', 'blue', '32-bit / 768kHz',
         'DESK-CORE', ARRAY['USB-C', '4.4mm balanced']::TEXT[],
         ARRAY['Matte Black', 'Silver']::TEXT[],
         16, TRUE, NULL,
         '{"dac":"ESS Sabre 9038","bit_depth":32,"sample_rate_khz":768}'::JSONB),
        ('spare-coolgel-cushions', 'Spare CoolGel Cushions', 'Accessories', 'Headphone Accessories',
         'Magnetic quick-swap earpads with perforated ventilation fabric.',
         34.00, 4.7, 38, 'COOLGEL MODULAR', 'sky', 'Magnetic Quick-Swap',
         'STUDIO-ONE', ARRAY[]::TEXT[],
         ARRAY['Black']::TEXT[],
         38, TRUE, NULL,
         '{"material":"CoolGel memory foam","attachment":"magnetic quick-swap"}'::JSONB),
        ('aster-studio-laptop', 'Aster Studio Laptop', 'Computing', 'Laptops',
         'Portable creator workstation with a color-accurate display and high-speed storage.',
         1499.00, 4.8, 86, 'CREATOR EDITION', 'blue', '14-inch • 32GB • 1TB SSD',
         'ASTER', ARRAY['USB-C', 'Wi-Fi 7']::TEXT[],
         ARRAY['Space Gray', 'Silver']::TEXT[],
         14, TRUE, NULL,
         '{"screen_inches":14,"memory_gb":32,"storage_tb":1,"wifi":"Wi-Fi 7"}'::JSONB),
        ('aurora-32-4k-display', 'Aurora 32 4K Display', 'Displays', 'Studio Displays',
         'A 32-inch 4K display tuned for accurate color and long studio sessions.',
         1099.00, 4.7, 74, 'COLOR CALIBRATED', 'neutral', '4K UHD • 98% DCI-P3 • USB-C',
         'AURORA', ARRAY['USB-C', 'HDMI']::TEXT[],
         ARRAY['Silver']::TEXT[],
         9, TRUE, NULL,
         '{"screen_inches":32,"resolution":"3840x2160","color_gamut":"98% DCI-P3"}'::JSONB),
        ('keycraft-pbt-keycaps', 'Keycraft PBT Keycap Set', 'Accessories', 'Keyboard Accessories',
         'Durable double-shot PBT keycaps with a sculpted profile for custom keyboards.',
         59.00, 4.6, 47, 'DOUBLE-SHOT PBT', 'sky', 'PBT • 140 keys • Sculpted profile',
         'KEYCRAFT', ARRAY[]::TEXT[],
         ARRAY['Charcoal', 'Ivory']::TEXT[],
         45, TRUE, NULL,
         '{"material":"PBT","key_count":140,"printing":"double-shot"}'::JSONB),
        ('reference-xlr-cable', 'Reference XLR Cable', 'Audio & Acoustics', 'Desk & Cable Accessories',
         'Balanced low-noise microphone cable with reinforced connectors for studio use.',
         29.00, 4.7, 33, 'STUDIO GRADE', 'neutral', '3m • Balanced XLR • Shielded',
         'INTERCONNECT', ARRAY['XLR']::TEXT[],
         ARRAY['Black']::TEXT[],
         60, TRUE, NULL,
         '{"length_meters":3,"connector":"XLR","shielded":true}'::JSONB),
        ('isolation-monitor-stand', 'Isolation Monitor Stand', 'Accessories', 'Desk & Cable Accessories',
         'Adjustable steel desktop stand with vibration-damping isolation pads.',
         119.00, 4.8, 29, 'VIBRATION CONTROL', 'dark', 'Adjustable • Steel • Isolation pads',
         'ISO-DECK', ARRAY[]::TEXT[],
         ARRAY['Black']::TEXT[],
         18, TRUE, NULL,
         '{"material":"steel","height_adjustable":true,"vibration_isolation":true}'::JSONB)
)
INSERT INTO ecommerce.product (
    slug, name, category, subcategory, description, price, rating, review_count,
    badge, badge_tone, specs, series, connectivities, finishes, stock, in_stock,
    noise_cancelling, attributes, image_url, image_alt
)
SELECT seed.slug, seed.name, seed.category, seed.subcategory, seed.description,
       seed.price, seed.rating, seed.review_count, seed.badge, seed.badge_tone,
       seed.specs, seed.series, seed.connectivities, seed.finishes, seed.stock,
       seed.in_stock, seed.noise_cancelling, seed.attributes,
       CASE
           WHEN seed.category IN ('Audio', 'Audio & Sound', 'Audio & Acoustics')
               THEN 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRH51k-UFfJWXJCHNPhirypmPoXDHbdNsU3hieOSNHjwu_7Q49CKK3IV7SYwGJHu3gXo3Id_RKcIPPnI98DxCVURUUsN2VeIm7a65nmO3GDKomnEWtQWRbEIbmS0tQSRcpP0qN82sZjRXEKGkZlCPF3Jc8Cpmn99T6ViYXK2ZrQxxnPAhSUjGjDg2tdtEqJ6p0VpW1CUNCkUfS2rOhKLvutx6vQI8zzzfOuBiUABz2UzU37nwewNimqg'
           WHEN seed.category IN ('Computing', 'Laptops', 'Desktops', 'Storage')
               THEN 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ddJBHuaPRnRdh-Yh29k1Z3GEaX9XqiQA0U2DM7gaQx8bPoY3nDytIZByU3ASTBWTJlSj4U4aoI2XqP9iUl3gMaJtS2mhD-uXCbSOrBu911BthIXef2pG4WQihwBG_L6RfygyCrrPopBZ9VASjxIyMQNvh3b13K2mJ4H2vluFCoFwPsEHATISVsFHoXSJQ1J9dbMcLkBFmbRX6ylb74XwUA21Y_QIXtxPR_HsLEZ1jjwXRkEGY4LQww'
           WHEN seed.category IN ('Displays', 'Monitors')
               THEN 'https://lh3.googleusercontent.com/aida-public/AB6AXuCetNKnND_bbZI-we0o5YU_u5e5X4tCDPCX-4YDS4JF74LsxnjDGvcO0HTl2LVQ2rA_s7T7KS9Tw4OhucqcLq4dYLpmgqB1fCbpeXnj6rqjTslgMxF4ho60ehFkG3SYzVd1QohoZ7vHmSNwBmD8j2fSMYNn9wOBTQ6k96RUT61MfuStKgNt9CpUb-O2mb8PsX-xKtDiFcgPA8pQsmtpoomY7Pmw2ZpIU1tU4lo_pBKvscwH9QnG21xu0A'
           ELSE 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSensA5pUcq3smRpD-mEWwBWapwusr2lUH3sZ6PrbdH1SK3GyzW1ACdKscYFm35yX2oynP85MXh69hBJR6IrfBtPfAz_ZyQObtSyWZF9f0aP0Onxoi6HoaT_CG8nxtlUQTSC2kChxkVp3F3-R9sPWirKcmrGGAE1PuIe4dcI8OnV6Oa773m6fj2hfLeBFZPyzYvXW_xIpaGwvsoTFGJuA-r20XWlXfR-ARvEYd39MAGj1-Bwzgn7ZWkA'
       END,
       seed.name || ' product image'
FROM seed_products seed
WHERE NOT EXISTS (
    SELECT 1
    FROM ecommerce.product existing
    WHERE existing.slug = seed.slug OR existing.name = seed.name
);

-- Links seeded products to storefront categories in a stable display order.
INSERT INTO ecommerce.storefront_category_product (category_id, product_id, display_order)
SELECT category.category_id,
       product.product_id,
       ROW_NUMBER() OVER (PARTITION BY category.category_id ORDER BY product.name)::SMALLINT - 1
FROM ecommerce.storefront_category category
JOIN ecommerce.product product
  ON (
      category.slug = 'premium-audio'
      AND product.category IN ('Audio', 'Audio & Sound', 'Audio & Acoustics')
  ) OR (
      category.slug = 'studio-computing'
      AND product.category IN ('Computing', 'Laptops', 'Desktops', 'Storage')
  ) OR (
      category.slug = 'ultrawide-displays'
      AND product.category IN ('Displays', 'Monitors')
  ) OR (
      category.slug = 'desk-setup-accessories'
      AND product.category IN ('Accessories', 'Power', 'Networking', 'Smart Home')
  )
ON CONFLICT (category_id, product_id) DO NOTHING;

-- Adds the five Studio One product gallery images from studioOneDetail.ts.
INSERT INTO ecommerce.product_gallery (product_id, image_url, alt_text, label, display_order)
SELECT product.product_id, gallery.image_url, gallery.alt_text, gallery.label, gallery.display_order
FROM ecommerce.product product
CROSS JOIN (
    VALUES
        ('https://lh3.googleusercontent.com/aida-public/AB6AXuCW1q7nj7xZokPafsFS6okkNfsynx0Oa3T-f7CgVyDk9tGYVU1pwRgUSK3oeLLdjccisRlvvwWMwjkYRZrR2WN8nFgoLf1M25TZ-bpi_tqDCcMRR-eODQ-1XL60r4ctdg5sMlyQsdnmvaROh9gsNcmewDvRsczhc5ka0FVXdLeGNh6X4vC8VUvbNMt94Lu4_AzCGaEt03cAnh4lI5fXW1ytgxbMFukxfVMGyYHKeq7BKJw3rc63ezvcRw', 'NEXUS Studio One wireless headphones in a studio product photograph', 'Studio view', 0),
        ('https://lh3.googleusercontent.com/aida-public/AB6AXuCEHglPFSKm_KZS2CFNpwzEVgjX7tqQ5uf5qm-tnAEOB9d5EbWgVyRAYNLYf7FQUhyIwBwqaCe7hSCCtOIjaVu7jeiF_urpXHnlEE7SUi3CQR7Y9JVbZ1yxrdX9hR7r4xsc9NPppdwsoirwOcyEhruhM0TGTb23b7UddSuu1mZjfsUGIEYXdwfCJTEhC8dJwSyO6aEyrinU5o0Go6Ch3MrfIplMPNiHMSyvyD9ZaNGsxbrzomLCyjBqbQ', 'Front profile showing the headphone headband and adjustment notches', 'Front profile', 1),
        ('https://lh3.googleusercontent.com/aida-public/AB6AXuCEXTHEUBe_drEaKVSNNwapn-MfRIS-Rzw4NRHFh5nv52UcKkSeBiYIPe0FbwZscrqFz9uMTnR7XnnWs673ZyjIGIFrMCMYIvAPxEduOVKQuBv8UzHOX-szzmJcWLoDuJ0Tf9T1JGpStWJJMTxfM12tas4zNzAN5hihtv2-VMrQZxWT5xCEZV-vptnxR9_outcPGEPB5b_5Kfrs9hGLIQXhZRe1tjsz91m5BZigS3LTzqjTDR3oFsnxrQ', 'Close-up of the machined volume wheel, acoustic vents, and ear cushion', 'Detail view', 2),
        ('https://lh3.googleusercontent.com/aida-public/AB6AXuDlaoMWQ7k5F-31QkFkywXnLOey5u7S7Jm8NnoWFAIWgwnrkOP7Gwsq46ZOjGbFgaiF_ScvrGsJt_-FtWI04UfjJJUxzHL3Boq5ZG8yoo-8flzroA81kC1l94FXk6_OVL4g4Jr4CKPaVWHmssdMx11B826U6j7YnLgKYSx_O_taxzvCNN_GONVh3FMvbMb96E7PkqUnG19z8R1NGy5OPx8nIcEzCMYmn_-6-5-KbRUMP3xop8B5cfOrhQ', 'Folded headphones beside their molded travel case and included cables', 'Travel kit', 3),
        ('https://lh3.googleusercontent.com/aida-public/AB6AXuDoaW9WemQZhcbpKVii_hVlu_WtphNo8XPvRKK4-YQDzfDxHtK8_jzMu8DwnqGoHH61rCbqknbsos0TrR3m-pArB-69kBbgcHFiMiP7Z98TujRxeY-8rf7S0DaEivqneoa4YivvqWP0XY_x3Lw-y5R489RZ-8DPPWCkBaYb36btPN326OsyGU4X7JdogG4GLYrgRc9x0BrkmflyTYf5XYDV1FLZoH24ppPwsIsR_PUT2mfmusHb9-uNsQ', 'Sound designer wearing Studio One headphones in a daylight studio', 'In the studio', 4)
) AS gallery(image_url, alt_text, label, display_order)
WHERE product.slug = 'studio-one-headphone'
  AND NOT EXISTS (
      SELECT 1 FROM ecommerce.product_gallery existing
      WHERE existing.product_id = product.product_id
        AND existing.display_order = gallery.display_order
  );

-- Adds the Studio One technical specification section headings.
INSERT INTO ecommerce.product_specification_group (product_id, group_name, title, display_order)
SELECT product.product_id, seed.group_name, seed.title, seed.display_order
FROM ecommerce.product product
CROSS JOIN (
    VALUES
        ('Acoustic transducers', 'Driver system', 0),
        ('Transmission & DSP', 'Wireless architecture', 1),
        ('Power & ergonomics', 'Endurance & build', 2)
) AS seed(group_name, title, display_order)
WHERE product.slug = 'studio-one-headphone'
ON CONFLICT (product_id, display_order) DO NOTHING;

-- Adds the Studio One specification name/value rows.
INSERT INTO ecommerce.product_specification
    (group_id, specification_name, specification_value, display_order)
SELECT specification_group.group_id,
       specification.specification_name,
       specification.specification_value,
       specification.display_order
FROM ecommerce.product product
JOIN ecommerce.product_specification_group specification_group
  ON specification_group.product_id = product.product_id
CROSS JOIN (
    VALUES
        ('Acoustic transducers', 'Transducer type', '40mm Bio-Cellulose Dome', 0),
        ('Acoustic transducers', 'Frequency response', '10 Hz – 45,000 Hz', 1),
        ('Acoustic transducers', 'Impedance', '32 Ω @ 1 kHz', 2),
        ('Acoustic transducers', 'Harmonic distortion (THD)', '< 0.05% (1 mW / 1 kHz)', 3),
        ('Acoustic transducers', 'Acoustic principle', 'Closed-Back Tuned Port', 4),
        ('Transmission & DSP', 'Bluetooth standard', 'Version 5.4 Class 1', 0),
        ('Transmission & DSP', 'Audiophile codecs', 'LDAC, aptX Adaptive, AAC, SBC', 1),
        ('Transmission & DSP', 'Multi-point pair', 'Up to 3 Devices Seamless', 2),
        ('Transmission & DSP', 'Microphones', '6x Beamforming + Bone Conduction', 3),
        ('Transmission & DSP', 'Wired pass-through', '3.5mm Analog + USB-C 24/96 Hi-Res', 4),
        ('Power & ergonomics', 'Battery life (ANC on)', '42 Hours continuous', 0),
        ('Power & ergonomics', 'Battery life (ANC off)', '55 Hours continuous', 1),
        ('Power & ergonomics', 'Rapid charge', '10 mins charge = 6.5 hrs play', 2),
        ('Power & ergonomics', 'Total weight', '260g (Balanced Clamp 3.8N)', 3),
        ('Power & ergonomics', 'Ear cushion material', 'CoolGel Memory Foam + Vegan Hide', 4)
) AS specification(group_name, specification_name, specification_value, display_order)
WHERE product.slug = 'studio-one-headphone'
  AND specification_group.group_name = specification.group_name
ON CONFLICT (group_id, display_order) DO NOTHING;

-- Adds the Studio One in-box contents.
INSERT INTO ecommerce.product_box_content (product_id, title, description, icon, display_order)
SELECT product.product_id, seed.title, seed.description, seed.icon, seed.display_order
FROM ecommerce.product product
CROSS JOIN (
    VALUES
        ('NEXUS Studio One', 'Flagship wireless headphones calibrated at factory with individual test sheet.', 'headphones', 0),
        ('Magnetic Travel Pouch', 'Ultra-slim vegan suede pouch with hidden magnetic closure and accessory sleeve.', 'luggage', 1),
        ('Braided OFC Audio Cable', '1.5m Oxygen-Free Copper 3.5mm cable with gold-plated 6.35mm studio adapter.', 'cable', 2),
        ('USB-C Audio / Charge', 'Custom shielded USB-C to USB-C cable for lossless 24-bit/96kHz audio.', 'usb', 3)
) AS seed(title, description, icon, display_order)
WHERE product.slug = 'studio-one-headphone'
ON CONFLICT (product_id, display_order) DO NOTHING;

-- Adds the two Studio One review examples from studioOneDetail.ts.
INSERT INTO ecommerce.product_review (
    product_id, initials, reviewer_name, reviewer_role, is_verified,
    review_title, review_body, reviewed_at
)
SELECT product.product_id, seed.initials, seed.reviewer_name, seed.reviewer_role,
       TRUE, seed.review_title, seed.review_body, CURRENT_TIMESTAMP - seed.review_age
FROM ecommerce.product product
CROSS JOIN (
    VALUES
        ('MK', 'Marcus K.', 'Verified Mastering Engineer',
         'Tuning is phenomenally neutral. Zero ear fatigue after 7-hour session.',
         'Most consumer ANC cans boost 100Hz into muddy territory. Studio One holds an astonishingly flat transient curve. The mechanical volume knurl feels like high-end stereo gear from the 80s, but the DAC latency over USB-C is completely imperceptible.',
         INTERVAL '2 days'),
        ('EL', 'Elena L.', 'Verified Buyer',
         'Flight isolation is terrifyingly effective.',
         'Wore them on a transatlantic flight from Zurich to SFO. The dual-pressure sensors eliminated the cabin roar entirely without feeling that strange eardrum-vacuum pressure typical of competitors.',
         INTERVAL '7 days')
) AS seed(initials, reviewer_name, reviewer_role, review_title, review_body, review_age)
WHERE product.slug = 'studio-one-headphone'
  AND NOT EXISTS (
      SELECT 1 FROM ecommerce.product_review existing
      WHERE existing.product_id = product.product_id
        AND existing.review_title = seed.review_title
  );

-- Recommends the three related products shown with Studio One.
INSERT INTO ecommerce.related_product (product_id, related_product_id, display_order)
SELECT studio.product_id, related.product_id, related_seed.display_order
FROM ecommerce.product studio
JOIN (
    VALUES
        ('desk-stand-pro', 0),
        ('nexus-core-dac-amp', 1),
        ('spare-coolgel-cushions', 2)
) AS related_seed(slug, display_order) ON TRUE
JOIN ecommerce.product related ON related.slug = related_seed.slug
WHERE studio.slug = 'studio-one-headphone'
  AND studio.product_id <> related.product_id
ON CONFLICT (product_id, related_product_id) DO NOTHING;

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
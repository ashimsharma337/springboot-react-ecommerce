CREATE DATABASE IF NOT EXISTS `ecommerce-backend`
    CHARACTER SET utf8mb4;

USE `ecommerce-backend`;

CREATE TABLE IF NOT EXISTS `user` (
    `user_id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `role` VARCHAR(255) NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `product` (
    `product_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `price` DOUBLE NULL,
    `description` VARCHAR(255) NULL,
    `stock` INT NULL,
    `category` VARCHAR(255) NULL,
    PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `cart` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NULL,
    `product_id` BIGINT NULL,
    `quantity` INT NULL,
    `status` VARCHAR(255) NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_cart_user`
        FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
    CONSTRAINT `fk_cart_product`
        FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `orders` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NULL,
    `total_price` DOUBLE NULL,
    `order_date` DATETIME(6) NULL,
    `status` VARCHAR(255) NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_orders_user`
        FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
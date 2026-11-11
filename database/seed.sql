-- seed.sql
-- Database Seeds
USE ecommerce_db;

INSERT INTO users (id, name, email, password, role, created_at) VALUES
('usr_01', 'Admin User', 'admin@kairo.com', '$2b$10$epRswT6CsFzZ1Q4g1O7lE.mJb/f0rQ.27g.OaJ5f0g6fK2L8L9vXe', 'admin', NOW()),
('usr_02', 'Customer One', 'customer@kairo.com', '$2b$10$epRswT6CsFzZ1Q4g1O7lE.mJb/f0rQ.27g.OaJ5f0g6fK2L8L9vXe', 'customer', NOW());

INSERT INTO categories (id, name, slug, description, created_at) VALUES
('cat_01', 'Electronics', 'electronics', 'Gadgets and electronic equipment', NOW()),
('cat_02', 'Fashion', 'fashion', 'Apparel, accessories, and shoes', NOW());

INSERT INTO products (id, name, slug, description, price, stock, category_id, created_at) VALUES
('prd_01', 'Pro Laptop 16', 'pro-laptop-16', 'High performance workstation laptop', 1899.99, 25, 'cat_01', NOW()),
('prd_02', 'Wireless Headphones', 'wireless-headphones', 'Crisp audio with active noise cancellation', 299.99, 60, 'cat_01', NOW()),
('prd_03', 'Classic Cotton T-Shirt', 'classic-cotton-tshirt', '100% organic cotton comfort fit', 29.99, 150, 'cat_02', NOW());

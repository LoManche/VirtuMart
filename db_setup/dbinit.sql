-- Programmer: Lo Yat Fung 1155158670
-- Purpose: This file is used to create the database and tables for the project.
--         It also inserts some sample data into the tables.
--         The data is inserted from csv files and manually.
-- setting up SQL database for the project
create database if not exists virtumartdb;
create user if not exists 'Mart'@'localhost' identified by 'Mart1234';
SET GLOBAL event_scheduler = ON;
SET GLOBAL local_infile = true;

use virtumartdb;
grant all privileges on virtumartdb.* to 'Mart'@'localhost';
-- Creating tables
create table if not exists products (
	asin varchar(10) NOT NULL,
	title text NOT NULL,
	imgURL text,
	rating float default 0,
	price float NOT NULL,
	discount float default 0,
	category_id int NOT NULL,
	description text,
	stock int default 0,
	primary key (asin)
);
create table if not exists customers (
	customer_id int not null auto_increment,
	username varchar(20) not null,
	firstName varchar(20) not null,
	lastName varchar(20) not null,
	phone varchar(20) not null,
	address text not null,
	city varchar(20) not null,
	state varchar(20) not null,
	password varchar(20) not null,
	email varchar(255) not null,
	created_at timestamp default current_timestamp not null,
	primary key (customer_id)
);
create table if not exists Admin (
	admin_id int not null auto_increment,
	adminname varchar(20) not null,
	password varchar(20) not null,
	primary key (admin_id)
);
create table if not exists shopping_cart (
	cart_id int not null auto_increment,
	customer_id int not null,
	product_id varchar(10) not null,
	quantity int not null,
	primary key (cart_id),
	foreign key (customer_id) references customers(customer_id),
	foreign key (product_id) references products(asin)
);
create table if not exists reviews (
	review_id int not null auto_increment,
	product_id varchar(10) not null,
	rating int not null,
	customer_id int not null,
	review text not null,
	dateOfReview date not null default (CURRENT_DATE),
	primary key (review_id),
	foreign key (product_id) references products(asin),
	foreign key (customer_id) references customers(customer_id)
);
create table if not exists categories (
    category_id int not null auto_increment,
    category_name varchar(255) not null,
    primary key (category_id)
);

create table if not exists martorder(
    order_id int not null auto_increment,
    customer_id int not null,
    subTotal float not null,
    shippingCost float not null,
    orderStatus enum('Ordered','Shipped','Delivering','Delivered') not null,
    dateOfOrder timestamp default current_timestamp not null,
    flat varchar(20) not null,
    address text not null,
    city varchar(20) not null,
    country varchar(30) not null,
    postalCode varchar(10) not null,
    paymentMethod varchar(20) not null,
    primary key (order_id),
    foreign key (customer_id) references customers(customer_id)
);

create table if not exists martorder_products (
    id int not null auto_increment,
    order_id int not null,
    customer_id int not null,
    product_id varchar(10) not null,
    quantity int not null,
    primary key (id),
    foreign key (order_id) references martorder(order_id),
    foreign key (customer_id) references customers(customer_id),
    foreign key (product_id) references products(asin)
);

create table if not exists otp (
    email varchar(255) not null,
    otp varchar(6) not null,
    created_at timestamp default current_timestamp not null,
    primary key (email)
);
CREATE EVENT IF NOT EXISTS cleanup_otp
ON SCHEDULE EVERY 1 HOUR
DO
    DELETE FROM otp WHERE created_at < NOW() - INTERVAL 1 HOUR;
    
create table if not exists forgetpw (
    email varchar(255) not null,
    hashed varchar(64) not null,
    created_at timestamp default current_timestamp not null,
    primary key (email)
);
CREATE EVENT IF NOT EXISTS cleanup_forgetpw
ON SCHEDULE EVERY 1 HOUR
DO
    DELETE FROM forgetpw WHERE created_at < NOW() - INTERVAL 1 HOUR;

create table if not exists notifications (
	notification_id int not null auto_increment,
	customer_id int not null,
	message text not null,
	dateOfNotification timestamp default current_timestamp not null,
	primary key (notification_id),
	foreign key (customer_id) references customers(customer_id)
);

-- Inserting data from csv files
LOAD DATA LOCAL INFILE 'G:/Codes/3100Project/db_setup/amazon_products_sample_utf8.csv' 
INTO TABLE products 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(asin,title,imgUrl,rating,price,category_id,stock);

LOAD DATA LOCAL INFILE 'G:/Codes/3100Project/db_setup/selected_categories.csv' 
INTO TABLE categories
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(category_id,category_name);
-- Inserting data manually
-- Sample Admin
INSERT INTO Admin (adminname, password) 
VALUES ('adminUser', 'password');
-- Sample Customer
INSERT INTO customers (username, firstName, lastName, phone, address, city, state, password, email) 
VALUES ('User1', 'John', 'Doe', '1234567890', "Sample Address", 'SampleCity', 'SampleState', 'password123', 'user1@example.com');
INSERT INTO customers (username, firstName, lastName, phone, address, city, state, password, email) 
VALUES ('User2', 'Jane', 'Doe', '2345678901', 'Another Address', 'AnotherCity', 'AnotherState', 'password456', 'user2@example.com');
INSERT INTO customers (username, firstName, lastName, phone, address, city, state, password, email) 
VALUES ('User3', 'Jim', 'Smith', '3456789012', 'Yet Another Address', 'YetAnotherCity', 'YetAnotherState', 'password789', 'user3@example.com');

-- Sample Review
insert into reviews (customer_id, product_id, rating, review) VALUES (1,"B0002DO1RI",5,"Great Stuff!" );

-- Sample shopping Cart
-- INSERT INTO shopping_cart (customer_id, product_id, quantity)
-- VALUES (1, 'B0002DO1RI', 3);
-- INSERT INTO shopping_cart (customer_id, product_id, quantity)
-- VALUES (1, 'B00AWB13E4', 4);

-- Insert a sample order into the martorder table
INSERT INTO martorder (customer_id, subTotal, shippingCost, orderStatus, flat, address, city, country, postalCode, paymentMethod)
VALUES (1, 100.00, 10.00, 'Ordered', 'Flat 1A', '123 Street', 'Tuen Mun', 'Hong Kong, China', '12345', 'Credit Card');
INSERT INTO martorder (customer_id, subTotal, shippingCost, orderStatus, flat, address, city, country, postalCode, paymentMethod)
VALUES (2, 200.00, 20.00, 'Ordered', 'Flat 2B', '456 Street', 'Yuen Long', 'Hong Kong, China', '23456', 'Credit Card');
INSERT INTO martorder (customer_id, subTotal, shippingCost, orderStatus, flat, address, city, country, postalCode, paymentMethod)
VALUES (3, 300.00, 30.00, 'Ordered', 'Flat 3C', '789 Street', 'Tsuen Wan', 'Hong Kong, China', '34567', 'Credit Card');



-- Insert a sample product into the martorder_products table
INSERT INTO martorder_products (order_id, customer_id, product_id, quantity)
VALUES (1, 1, 'B0BR5B5VQ1', 2);
INSERT INTO martorder_products (order_id, customer_id, product_id, quantity)
VALUES (1, 1, 'B0BRXRTRTJ', 3);
INSERT INTO martorder_products (order_id, customer_id, product_id, quantity)
VALUES (2, 2, 'B0B9XL3MR3', 3);
INSERT INTO martorder_products (order_id, customer_id, product_id, quantity)
VALUES (2, 2, 'B00791F4KY', 4);
INSERT INTO martorder_products (order_id, customer_id, product_id, quantity)
VALUES (3, 3, 'B07QMTYNKK', 5);
INSERT INTO martorder_products (order_id, customer_id, product_id, quantity)
VALUES (3, 3, 'B0BNKXPNW2', 6);

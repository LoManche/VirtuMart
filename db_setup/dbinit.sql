-- setting up SQL(not finished)
create database if not exists virtumartdb;
create user if not exists 'Mart'@'localhost' identified by 'Mart1234';
use virtumartdb;
grant all privileges on virtumartdb.* to 'Mart'@'localhost';
SET global local_infile = true;
-- Creating tables
create table if not exists products (
	asin varchar(10) NOT NULL,
	title text,
	imgURL text,
	rating float default 0,
	price float,
	discount float default 0,
	category_id int,
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
    category_id int not null,
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
-- Inserting data from csv files
LOAD DATA LOCAL INFILE 'G:/Codes/3100Project/db_setup/amazon_products_sample_utf8.csv' 
INTO TABLE products 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(asin,title,imgUrl,rating,price,category_id);

LOAD DATA LOCAL INFILE 'G:/Codes/3100Project/db_setup/selected_categories.csv' 
INTO TABLE categories
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(category_id,category_name);
-- Inserting data manually
INSERT INTO customers (username, firstName, lastName, phone, city, state, password, email) 
VALUES ('sampleUser', 'John', 'Doe', '1234567890', 'SampleCity', 'SampleState', 'password123', 'sampleUser@example.com');
insert into reviews (customer_id, product_id, rating, review) VALUES (1,"B0002DO1RI",5,"Great Stuff!" );
INSERT INTO Admin (adminname, password) 
VALUES ('adminUser', 'password');

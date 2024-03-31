-- setting up SQL(not finished)
create database if not exists virtumartdb;
use virtumartdb;
SET global local_infile = 1;
-- Creating tables
create table if not exists products (
  asin varchar(10) NOT NULL,
  title varchar(255),
  imgURL varchar(255),
  rating float,
  price float,
  discount float,
  category_id int,
  description varchar(255),
  stock int,
  primary key (asin)
);
create table if not exists customers (
  customer_id int not null auto_increment,
  firstName varchar(20) not null,
  lastName varchar(20) not null,
  phone varchar(20) not null,
  city varchar(20) not null,
  state varchar(20) not null,
  password varchar(20) not null,
  email varchar(255) not null,
  created_at date not null,
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
  review varchar(255) not null,
  dateOfReview date not null,
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
    orderStatus varchar(20) not null,
    dateOfOrder date not null,
    flat varchar(20) not null,
    address varchar(255) not null,
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
LOAD DATA LOCAL INFILE 'G:/Codes/3100Project/db_setup/amazon_products_sample_ansi.csv' 
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
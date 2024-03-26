-- setting up SQL(not finished)
create database if not exist virtumartdb;
use virtumartdb;
SET global local_infile = 1;
create table if not exist products (
	asin varchar(10) NOT NULL,
    title varchar(255),
    imgURL varchar(255),
	stars float,
    price float,
    listPrice float,
    category_id int,
    primary key (asin)
);
create table if not exist customers (
	id int not null auto_increment,
    name varchar(20) not null,
    primary key (id)
);
create table if not exist reviews (
	review_id int not null auto_increment,
    product_id varchar(10) not null,
    star int not null,
    customer_id int not null,
    content varchar(255) not null,
    primary key (review_id),
    foreign key (product_id) references products(asin),
    foreign key (customer_id) references customers(id)
);
create table if not exist categories (
    category_id int not null,
    category_name varchar(255) not null,
    primary key (category_id)
);

LOAD DATA LOCAL INFILE 'G:/Codes/3100Project/amazon_products_sample_ansi.csv' 
INTO TABLE products 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(asin,title,imgUrl,stars,price,listPrice,category_id);

LOAD DATA LOCAL INFILE 'G:/Codes/3100Project/selected_categories.csv' 
INTO TABLE categories
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS 
(category_id,category_name);

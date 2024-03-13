create table hibernate_sequence (
    next_val bigint
) engine=MyISAM;

insert into hibernate_sequence values (1);

CREATE TABLE user(
                     id BIGINT NOT NULL AUTO_INCREMENT,
                     username varchar(64) not null unique,
                     password varchar(64) not null unique,
                     role_id BIGINT not null,
                     user_info_id BIGINT UNIQUE,
                     status varchar(64) default 'Активный',
                     PRIMARY KEY (id),
                     FOREIGN KEY (role_id) REFERENCES role(id),
                     FOREIGN KEY (user_info_id) REFERENCES user_info(id)
) engine=MyISAM;

CREATE TABLE role(
                     id BIGINT NOT NULL AUTO_INCREMENT,
                     name varchar(64) not null,
                     PRIMARY KEY (id)
) engine=MyISAM;

CREATE TABLE basket(
                       id BIGINT NOT NULL AUTO_INCREMENT,
                       user_id BIGINT NOT NULL UNIQUE,
                       PRIMARY KEY (id),
                       FOREIGN KEY (user_id) REFERENCES user(id)
) engine=MyISAM;

CREATE TABLE user_info(
                       id BIGINT NOT NULL AUTO_INCREMENT,
                       email varchar(64) unique,
                       firstname varchar(64),
                       lastname varchar(64),
                       tel varchar(64) unique,
                       birth_date DATE,
                       image LONGBLOB,
                       PRIMARY KEY (id)
) engine=MyISAM;

CREATE TABLE menu_category(
                          id BIGINT NOT NULL AUTO_INCREMENT,
                          name varchar(64) unique,
                          image LONGBLOB not null,
                          PRIMARY KEY (id)
) engine=MyISAM;


CREATE TABLE menu_item(
                              id BIGINT NOT NULL AUTO_INCREMENT,
                              name varchar(64) unique,
                              price double not null,
                              weight int,
                              image LONGBLOB not null,
                              menu_category_id bigint not null,
                              menu_item_info_id bigint unique,
                              PRIMARY KEY (id),
                              FOREIGN KEY (menu_category_id) REFERENCES menu_category(id),
                              FOREIGN KEY (menu_item_info_id) REFERENCES menu_item(id)

) engine=MyISAM;

CREATE TABLE menu_item_info(
                               id BIGINT NOT NULL AUTO_INCREMENT,
                               ingredients varchar(64) not null,
                               is_spicy bool,
                               calories double,
                               PRIMARY KEY (id)
) engine=MyISAM;

CREATE TABLE orders
(
                          id BIGINT NOT NULL AUTO_INCREMENT,
                          sum decimal not null ,
                          delivery_type varchar(64) not null,
                          payment_type varchar(64) not null,
                          date DATE not null,
                          address varchar(64) not null,
                          name varchar(64),
                          tel varchar (64),
                          comment varchar(64),
                          status varchar(64) not null,
                          basket_id bigint not null,
                          PRIMARY KEY (id),
                          FOREIGN KEY (basket_id) REFERENCES basket(id)
) engine=MyISAM;

CREATE TABLE order_item
(
    id BIGINT NOT NULL AUTO_INCREMENT,
    quantity int not null,
    menu_item_id bigint not null,
    order_id bigint not null,
    PRIMARY KEY (id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_item(id),
    FOREIGN KEY (order_id) REFERENCES orders (id)
) engine=MyISAM;


CREATE TABLE basket_item
(
    id BIGINT NOT NULL AUTO_INCREMENT,
    quantity int not null,
    menu_item_id bigint not null,
    basket_id bigint not null,
    PRIMARY KEY (id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_item(id),
    FOREIGN KEY (basket_id) REFERENCES basket(id)
) engine=MyISAM;

INSERT INTO role (name)
VALUES ('ADMIN'),
       ('CLIENT');


SET @hashedPassword = '$2a$12$cRc85/DXGk35vAqOKh7oaeoRu3RiqBGGQHXs24p22QlPxeqw68Xpy';

INSERT INTO user_info (email, firstname, lastname)
VALUES ('eliza.romanova597@gmail.com', 'Елизавета', 'Маркиянова');

INSERT INTO user (username, password, role_id, status, user_info_id)
VALUES ('admin', @hashedPassword,  1, 'Администратор', 1);

create database vintech;

create table article(
    article_id serial primary key,
    article_pic varchar(255) not null,
    article_title varchar(255) not null,
    article_description varchar(5000) not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    article_polyuser int not null,
    foreign key (article_polyuser) references polyuser(polyuser_id),
    article_price varchar(255) not null,
    article_city varchar(255) not null
);

create table category(
    category_id serial primary key,
    category_name varchar(255) not null,
    category_article int not null,
    foreign key (category_article) references article(article_id)
);

create table polyuser(
    polyuser_id SERIAL PRIMARY KEY,
    polyuser_name VARCHAR(255) NOT NULL,
    polyuser_role VARCHAR(255) NOT NULL DEFAULT 'basic',
    polyuser_mail VARCHAR(255) UNIQUE NOT NULL,
    polyuser_password VARCHAR(255) NOT NULL,
    polyuser_description VARCHAR(500) NOT NULL DEFAULT 'pas de description',
    polyuser_city varchar(255) not null,
    polyuser_pic varchar(255) not null
);

create table fav(
    fav_id serial primary key,
    fav_polyuser int not null,
    fav_article int not null,
    foreign key (fav_polyuser) references polyuser(polyuser_id),
    foreign key (fav_article) references article(article_id)
);

create table dm(
    dm_id serial primary key,
    dm_message varchar(255) not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    dm_from int not null,
    dm_to int not null,
    foreign key (dm_from) references polyuser(polyuser_id),
    foreign key (dm_to) references polyuser(polyuser_id)
);
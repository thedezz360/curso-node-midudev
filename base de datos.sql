-- crear base de datos
drop database if exists moviesdb;
create database moviesdb;

-- usar
use moviesdb;

-- crear tabla movies
create table movies (
	id binary(16) primary key,
    title varchar(255) not null,
    year int not null,
    director varchar(255) not null,
    duration int not null,
    poster text,
    rate decimal(2,1) unsigned not null
);

create table genres (
	id int auto_increment primary key,
    name varchar(255) not null unique
);

create table movies_genres (
	movie_id binary(16) references movies(id),
    genre_id int references genres(id),
    primary key (movie_id, genre_id)
);

insert into genres (name) values
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');

insert into movies (id, title, year, director, duration, poster, rate) values
(UNHEX(REPLACE(UUID(),'-','')), "The Dark Knight", 2008, "Christopher Nolan", 152,"https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0),
(UNHEX(REPLACE(UUID(),'-','')), "The Shawshank Redemption", 1994, "Frank Darabont", 142,"https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 9.3),
(UNHEX(REPLACE(UUID(),'-','')), "Pulp Fiction", 1994, "Quentin Tarantino", 154,"https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 8.9);

insert into movies_genres(movie_id, genre_id) values
((select id from movies where title = "The Dark Knight"), (select id from genres where name = "Sci-Fi") ),
((select id from movies where title = "The Dark Knight"), (select id from genres where name = "Action") ),
((select id from movies where title = "The Dark Knight"), (select id from genres where name = "Adventure") ),
((select id from movies where title = "The Shawshank Redemption"), (select id from genres where name = "Drama") )


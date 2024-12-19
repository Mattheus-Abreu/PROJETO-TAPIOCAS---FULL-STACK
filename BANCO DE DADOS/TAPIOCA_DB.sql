create table foods (
	id integer primary key,
	name varchar,
	value real
)

create table filling (
	id integer,
	id_Food integer,
	name varchar,
	value real,
	primary key (id, id_Food),
	foreign key(id_Food) references foods(id)
)

select * from foods

select * from filling
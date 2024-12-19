CREATE TABLE IF NOT EXISTS foods
(
    id integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    value real,
    CONSTRAINT foods_pkey PRIMARY KEY (id)
)


CREATE TABLE IF NOT EXISTS filling
(
    id integer NOT NULL,
    id_food integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    value real,
    CONSTRAINT filling_pkey PRIMARY KEY (id, id_food),
    CONSTRAINT filling_id_food_fkey FOREIGN KEY (id_food)
        REFERENCES public.foods (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS sales
(
    id integer NOT NULL DEFAULT nextval('sales_id_seq'::regclass),
    idfood integer,
    cpf character varying COLLATE pg_catalog."default",
    datesale timestamp without time zone DEFAULT now(),
    description character varying COLLATE pg_catalog."default",
    value real,
    CONSTRAINT sales_pkey PRIMARY KEY (id),
    CONSTRAINT sales_idfood_fkey FOREIGN KEY (idfood)
        REFERENCES public.foods (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


INSERT INTO filling (id, id_food, name, value)
VALUES
(1, 1, 'Queijo', 2.50),
(2, 1, 'Presunto', 2.00),
(3, 1, 'Frango', 3.00),
(4, 1, 'Calabresa', 2.50),
(5, 1, 'Carne de Sol', 5.00),
(6, 1, 'Ovo', 1.50),
(7, 1, 'Bacon', 3.50),
(8, 1, 'Tomate', 1.00);

INSERT INTO filling (id, id_food, name, value)
VALUES
(9, 2, 'Queijo', 2.50),
(10, 2, 'Presunto', 2.00),
(11, 2, 'Frango', 3.00),
(12, 2, 'Calabresa', 2.50),
(13, 2, 'Carne de Sol', 5.00),
(14, 2, 'Ovo', 1.50),
(15, 2, 'Bacon', 3.50),
(16, 2, 'Tomate', 1.00);

INSERT INTO filling (id, id_food, name, value)
VALUES
(17, 3, 'Queijo', 2.50),
(18, 3, 'Presunto', 2.00),
(19, 3, 'Frango', 3.00),
(20, 3, 'Calabresa', 2.50),
(21, 3, 'Carne de Sol', 5.00),
(22, 3, 'Ovo', 1.50),
(23, 3, 'Bacon', 3.50),
(24, 3, 'Tomate', 1.00);

select * from foods

select * from filling

select * from sales

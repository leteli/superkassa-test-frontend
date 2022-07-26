CREATE DATABASE users_database;

CREATE TABLE IF NOT EXISTS public.phones
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT phones_pkey PRIMARY KEY (id, phone)
)

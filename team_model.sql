CREATE TABLE team_model (
	id serial PRIMARY KEY,
	name VARCHAR ( 200 ) UNIQUE NOT NULL,
	code VARCHAR ( 3 ) NOT NULL,
	country VARCHAR ( 200 ) NOT NULL,
	national boolean NOT NULL
);
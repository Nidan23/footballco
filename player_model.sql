CREATE TABLE player_model (
	id serial PRIMARY KEY,
	first_name VARCHAR ( 200 ) UNIQUE NOT NULL,
	last_name VARCHAR ( 200 ) NOT NULL,
	current_number VARCHAR ( 200 ) NOT NULL,
	position VARCHAR ( 200 ) NOT NULL,
	age VARCHAR ( 200 ) NOT NULL,
	photo VARCHAR ( 200 ) NOT NULL,
	current_team integer NOT NULL,
	FOREIGN KEY(current_team)
	REFERENCES team_model(id)
	ON DELETE CASCADE
);
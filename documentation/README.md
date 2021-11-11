
1. [Project architecture diagram](#project-architecture-diagram)
2. [Challenge](#proposed-web-application-interface-diagram)
3. [Sequence diagram](#sequence-diagram)
4. [Database schema](#database-schema) 
    4.1. [Queries and table initialization](queries-and-table-initialization)

<br>
<br>

## Project architecture diagram

![a](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/documentation/architecture-diagram.drawio.png)

## Proposed web application interface diagram

![b](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/documentation/interface-diagram.drawio.png)

## Sequence diagram

![c](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/documentation/system-diagram.drawio.png)

## Database schema

![d](https://github.com/matheusicaro/challenge-full-stack-ducks-feeding/blob/master/documentation/database-schema.png)

### Queries and table initialization

CREATE DOMAIN INDEX FOR EDITING IN CASCADE OF ENTRY FORMAT
```
CREATE DOMAIN name_domain varchar(150)
CREATE DOMAIN kilos_domain NUMERIC(18,3)
CREATE DOMAIN email_domain varchar(100)
```

CREATE A FOOD TABLE AND INSERT AN EXAMPLE
```
CREATE TABLE food (
	"name" name_domain PRIMARY KEY,
	"type" VARCHAR(50) NOT NULL,
	CONSTRAINT "name" CHECK (UPPER("name") = "name"),
	CONSTRAINT "type" CHECK (UPPER("type") = "type")
)
INSERT INTO food("name", "type")
VALUES 
	('RICE', 'CEREAL'),
	('CORN', 'CEREAL'),
	('EARTHWORM', 'ANIMAL')
```

CREATE FEEDING TABLE AND INSERTION EXAMPLE
```
CREATE TABLE feeding (
	"id" SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	"time" TIME NOT NULL,
	"location" VARCHAR(255),
	quantity_kilos kilos_domain default 0,
	food_name name_domain,
	CONSTRAINT fk_food FOREIGN KEY(food_name) REFERENCES food("name")
)
INSERT INTO feeding("time", "location", quantity_kilos, food_name)
VALUES 
	('04:05 AM', 'Japan', 50, 'RICE'),
	('11:30 PM', 'Brazil', 0.500, 'CORN'),
	('02:00 PM', 'USA', 1.800, 'EARTHWORM')
```

CREATE ANIMAL TABLE AND INSERTION EXAMPLE
```
CREATE TABLE animal (
	"name" name_domain PRIMARY KEY
)
INSERT INTO animal("name")
VALUES ('DUCK')
```

CREATE USER TABLE AND INSERT EXAMPLE
```
CREATE TABLE "user" (
	"email" email_domain PRIMARY KEY,
	"name" name_domain,
	"password" varchar(150),
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO "user"("email", "password", "name")
VALUES ('freshworks@matheusicaro.com', 'freshworks', 'Matheus Icaro Martins')
```

CREATE ENCLOSURE TABLE BETWEEN ANIMAL AND FEEDING AND INSERTION EXAMPLE
```
CREATE TABLE animal_feeding (
	"id" SERIAL PRIMARY KEY,
	animal_quantity INT DEFAULT 0,
	animal_name name_domain,
	feeding_id INT,
	user_id email_domain,
	CONSTRAINT fk_animal FOREIGN KEY(animal_name) REFERENCES animal("name"),
	CONSTRAINT fk_feeding FOREIGN KEY(feeding_id) REFERENCES feeding("id"),
	CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES "user"("email")
)
INSERT INTO animal_feeding(animal_quantity, animal_name, feeding_id, user_id)
VALUES 
	(80, 'DUCK', 2, 'freshworks@matheusicaro.com')
```
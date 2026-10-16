-- database: banco.db

CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT
);

INSERT INTO usuarios (id, nome, email)
VALUES (1, 'Jarvis', 'jarvis@megabrain.com.br');
-- Active: 1675434808500@@127.0.0.1@3306
CREATE TABLE users (  
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes  INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like  INTEGER DEFAULT(0) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes;

INSERT INTO users (id, name, email, password, role)
VALUES ("u001", "Virgínia Fonseca", "vivi22@email.com", "f12345#", "normal"),
       ("u002", "Mirella Santos", "milla_ss@email.com", "mi54321*", "admin"),
       ("u003", "Daniel Lima", "dani_lima@email.com", "lima12654%", "normal"),
       ("u004", "Sarah Oliveira", "sarinhah@email.com", "sarahholiver12", "admin"),
       ("u005", "Mônica Silva", "moni_silva@email.com", "monica123@", "normal"),
       ("u006", "Felipe Rodrigues", "felipe@email.com", "felipe5#", "admin");

INSERT INTO posts (id, creator_id, content)
VALUES ("p001", "u001", "Resiliência é ter força dentro de si para sempre recomeçar."),
       ("p002", "u002", "Seja de verdade em tudo que você faz."),
       ("p003", "u003", "Hoje comecei o meu terceiro período na faculdade de Computação"),
       ("p004", "u003", "Começando os estudos de JavaScript! :D");     

   
INSERT INTO likes_dislikes (user_id, post_id)
VALUES ("u001", "p001" ),
       ("u002", "p002"),
       ("u003", "p003");


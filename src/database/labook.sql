-- Active: 1675434808500@@127.0.0.1@3306
CREATE TABLE users (  
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
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

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES ("p001", "u001", "Resiliência é ter força dentro de si para sempre recomeçar.", 10, 0),
       ("p002", "u002", "Seja de verdade em tudo que você faz.", 25, 1),
       ("p003", "u003", "A única pessoa responsável pela sua paz é você mesma.", 5, 2);     

   
INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES ("u001", "p001", 1),
       ("u002", "p002", 0),
       ("u003", "p003", 0);
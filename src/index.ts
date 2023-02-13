import express, { Request, Response } from 'express'
import cors from 'cors'
import { UserController } from './controller/UserController'
import { PostController } from './controller/PostController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

const userController = new UserController()
const postController  = new PostController()

app.post("/users", userController.signup)
app.get("/users/login", userController.login)

app.post("/posts", postController.createPost)
app.get("/posts", postController.getPosts)
app.put("/posts/:id", postController.editPost)
app.delete("/posts/:id", postController.deletePost)

app.put("/post/:id/like", postController.likeDislikePost)
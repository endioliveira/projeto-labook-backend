import express, { Request, Response } from 'express'
import cors from 'cors'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/users", userRouter) // middleware de rota de users

app.use("/posts", postRouter)
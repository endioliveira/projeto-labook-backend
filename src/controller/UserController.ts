import { Request, Response } from "express"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserController {
    
  signup = async (req: Request, res: Response) => {
      try {
        const { id, name, email, password, role } = req.body as UserDB
        const userDBInstance = new UserDatabase()
  
        if (id !== undefined) {
          if (typeof id !== "string") {
            res.status(400)
            throw new Error("O 'id' deve ser string")
          }
        }
  
        if (name !== undefined) {
          if (typeof name !== "string") {
            res.status(400)
            throw new Error("O 'name' deve ser string")
          }
        }
        
        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("O 'email' deve ser string")
            }
        }
        
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("O 'password' deve ser string")
            }
        }
        
        if (role !== undefined) {
          if (typeof role !== "string") {
            res.status(400)
            throw new Error("O 'role' deve ser string")
          }
        }

        const newUser = new User(
          id,
          name,
          email,
          password,
          role,
          new Date().toISOString()
        )

        const newUserDB: UserDB = {
          id: newUser.getId(),
          name: newUser.getName(),
          email: newUser.getEmail(),
          password: newUser.getPassword(),
          role: newUser.getRole(),
          created_at: newUser.getCreatedAt(),
        }

        await userDBInstance.insertUser(newUser)
  
        res.status(201).send("um token jwt")
        
      } catch (error) {
        console.log(error)
  
        if (req.statusCode === 200) {
          res.status(500)
        }
  
        if (error instanceof Error) {
          res.send(error.message)
        } else {
          res.send("Erro inesperado")
        }
      }
    }

    login = async (req: Request, res: Response) => {
      try {
        const name = req.query.name as string | undefined
  
        const usersDB: UserDB[] = await new UserDatabase().findUser(name)
  
        const users: User[] = usersDB.map(
          (element) =>
            new User(
              element.id,
              element.name,
              element.email,
              element.password,
              element.role,
              element.created_at
            )
        )
  
        res.status(200).send("um token jwt")
      } catch (error) {
        console.log(error)
  
        if (req.statusCode === 200) {
          res.status(500)
        }
  
        if (error instanceof Error) {
          res.send(error.message)
        } else {
          res.send("Erro inesperado")
        }
      }
    }
}
  

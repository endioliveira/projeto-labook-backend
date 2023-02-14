import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"
import { BaseError } from '../errors/BaseError'
import { UserDTO } from "../dtos/UserDTO"


export class UserController {
  constructor(
    private userDTO: UserDTO,
    private userBusiness: UserBusiness,
  ) {

  }

  signup = async (req: Request, res: Response) => {
    try {
      // const { id, name, email, password, role } = req.body as UserDB

      const input = this.userDTO.signupInput(
        req.body.id,
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role
      )

      //chamar o método da business correspondente
      const output = await this.userBusiness.signup(input)

      res.status(201).send("um token jwt")

    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message) //aqui incluimos o método status com o código do erro correto
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const name = req.query.name as string | undefined

      //tratamento e regras
      const output = await this.userBusiness.login(name)

      res.status(200).send({ output: "um token jwt" })
    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}


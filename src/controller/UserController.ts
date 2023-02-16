import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"
import { BaseError } from '../errors/BaseError'
import { LoginInputDTO,  SignupInputDTO } from "../dtos/UserDTO"


export class UserController {
  constructor(
    // private userDTO: UserDTO,
    private userBusiness: UserBusiness
  ) {}


  public signup = async (req: Request, res: Response) => {
    try {

      const input: SignupInputDTO = {
        name: req.body.name,
        email:req.body.email,
        password: req.body.password
      }

      //chamar o método da business correspondente
      const output = await this.userBusiness.signup(input)

      res.status(201).send(output)

    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message) //aqui incluimos o método status com o código do erro correto
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public login = async (req: Request, res: Response) => {
    try {
      const input: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password
      }

      //tratamento e regras
      const output = await this.userBusiness.login(input)

      res.status(200).send(output)
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


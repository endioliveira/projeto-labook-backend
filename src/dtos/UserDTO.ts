import { BadRequestError } from "../errors/BadRequestError"
import { User } from "../models/User"

export interface SignupInputDTO {
    name: string,
    email: string,
    password: string
}

export interface SignupOutputDTO {
    message: string,
    token: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface LoginOutputDTO {
    message: string,
    token: string
}

export class UserDTO {
    public signupInput(
        name: unknown,
        email: unknown,
        password: unknown
    ): SignupInputDTO {
        

        if (name === undefined) throw new BadRequestError("'name' é obrigatório")
        if (typeof name !== "string") throw new BadRequestError("'name' deve ser string")

        if (email === undefined) throw new BadRequestError("'email' é obrigatório")
        if (typeof email !== "string") throw new BadRequestError("'email' deve ser string")

        if (password === undefined) throw new BadRequestError("'password' é obrigatório")
        if (typeof password !== "string") throw new BadRequestError("'password' deve ser string")

        const dto: SignupInputDTO = {
            name,
            email,
            password
          }

          return dto
    }

    // public signupOutput(user: User): SignupOutputDTO {
    //     const dto: SignupOutputDTO = {
    //         message: "Cadastro realizado com sucesso!",
    //         user: {
    //             id: user.getId(),
    //             name: user.getName(),
    //             email: user.getEmail(),
    //             role: user.getRole(),
    //             createdAt: user.getCreatedAt()
    //         }
    //     }

    //     return dto
    // }

    public loginInput(
        email: unknown,
        password: unknown,
    ): LoginInputDTO {
        
        if (email === undefined) throw new BadRequestError("'email' é obrigatório")
        if (typeof email !== "string") throw new BadRequestError("'email' deve ser string")

        if (password === undefined) throw new BadRequestError("'password' é obrigatório")
        if (typeof password !== "string") throw new BadRequestError("'password' deve ser string")


        const dto: LoginInputDTO = {
            email,
            password
          }

          return dto
    }

    // public loginOutput(user: User): LoginOutputDTO {
    //     const dto: LoginOutputDTO = {
    //         message: "Cadastro realizado com sucesso!"
    //     }

    //     return dto
    // }

}
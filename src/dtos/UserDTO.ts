import { BadRequestError } from "../errors/BadRequestError"
import { User } from "../models/User"

export interface SignupInputDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

export interface SignupOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        role: string,
        createdAt: string
    }
}

// export interface LoginInputDTO {
//     id: string,
//     name: string,
//     email: string,
//     password: string,
//     role: string
// }

// export interface LoginOutputDTO {
//     message: string,
//     user: {
//         email: string,
//         password: string
//     }
// }

export class UserDTO {
    public signupInput(
        id: unknown,
        name: unknown,
        email: unknown,
        password: unknown,
        role: unknown
    ): SignupInputDTO {
        
        if (id === undefined) throw new BadRequestError("'id' é obrigatório")
        if (typeof id !== "string") throw new BadRequestError("'id' deve ser string")

        if (name === undefined) throw new BadRequestError("'name' é obrigatório")
        if (typeof name !== "string") throw new BadRequestError("'name' deve ser string")

        if (email === undefined) throw new BadRequestError("'email' é obrigatório")
        if (typeof email !== "string") throw new BadRequestError("'email' deve ser string")

        if (password === undefined) throw new BadRequestError("'password' é obrigatório")
        if (typeof password !== "string") throw new BadRequestError("'password' deve ser string")

        if (role === undefined) throw new BadRequestError("'role' é obrigatório")
        if (typeof role !== "string") throw new BadRequestError("'role' deve ser string")

        const dto: SignupInputDTO = {
            id,
            name,
            email,
            password,
            role
          }

          return dto
    }

    public signupOutput(user: User): SignupOutputDTO {
        const dto: SignupOutputDTO = {
            message: "Cadastro realizado com sucesso!",
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole(),
                createdAt: user.getCreatedAt()
            }
        }

        return dto
    }

    // public loginInputDTO(
    //     id: unknown,
    //     name: unknown,
    //     email: unknown,
    //     password: unknown,
    //     role: unknown
    // ) {

    // }
}
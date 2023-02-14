import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"
import { BadRequestError } from '../errors/BadRequestError'
import { SignupInputDTO, SignupOutputDTO, UserDTO } from "../dtos/UserDTO"


export class UserBusiness {
    constructor(
        private userDBInstance: UserDatabase,
        private userDTO: UserDTO
    ) {}
    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {

        const { id, name, email, password, role } = input

        if(name.length < 2) {
            throw new BadRequestError("'name' deve ter pelo menos 2 caracteres.")
        }

        if(!email.includes("@")) {
            throw new BadRequestError("'email' inválido!")
        }

        if(password.length < 4) {
            throw new BadRequestError("'password' deve possuir pelo menos 4 caracteres!")
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

        await this.userDBInstance.insertUser(newUser)

        const output = this.userDTO.signupOutput(newUser)

        return output
    }

    public login = async (name: string | undefined) => {

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

        return ({ users: users })

    }

}
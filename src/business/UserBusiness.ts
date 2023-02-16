import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"
import { BadRequestError } from '../errors/BadRequestError'
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO, UserDTO } from "../dtos/UserDTO"
import { NotFoundError } from "../errors/NotFoundError"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager, TokenPayload } from "../services/TokenManager"
import { ROLES } from "../types"

export class UserBusiness {
    constructor(
        private userDBInstance: UserDatabase,
        private userDTO: UserDTO,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {

        const { name, email, password } = input

        const id = this.idGenerator.generate()

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
            ROLES.NORMAL,
            new Date().toISOString()
        )

        // const newUserDB: UserDB = {
        //     id: newUser.getId(),
        //     name: newUser.getName(),
        //     email: newUser.getEmail(),
        //     password: newUser.getPassword(),
        //     role: newUser.getRole(),
        //     created_at: newUser.getCreatedAt(),
        // }

        // await this.userDBInstance.insertUser(newUser)

        // const output = this.userDTO.signupOutput(newUser)

        const newUserDB = newUser.toDBModel()
        await this.userDBInstance.insertUser(newUserDB)

        // modelagem do payload do token
        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        // criação do token
        const token = this.tokenManager.createToken(tokenPayload)

        const output: SignupOutputDTO = {
            message: "Cadastro realizado com sucesso",
            token: token
        }

        return output
    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        if(!email.includes("@")) {
            throw new BadRequestError("'email' inválido!")
        }

        if(password.length < 4) {
            throw new BadRequestError("'password' deve possuir pelo menos 4 caracteres!")
        }

        // const usersDB: UserDB[] = await new UserDatabase().findUser(input)
        // console.log(email)
        const userDB = await this.userDBInstance.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado")
        }

        if (password !== userDB.password) {
            throw new BadRequestError("'email' ou 'password' incorretos")
        }

        // const users: User[] = usersDB.map(
        //     (element) =>
        //         new User(
        //             element.id,
        //             element.name,
        //             element.email,
        //             element.password,
        //             element.role,
        //             element.created_at
        //         )
        // )

        
        // modelagem do payload do token
        const tokenPayload: TokenPayload = {
            id: userDB.id,
            name: userDB.name,
            role: userDB.role
        }

        // criação do token
        const token = this.tokenManager.createToken(tokenPayload)

        const output: LoginOutputDTO = {
            message: "Login realizado com sucesso",
            token
        }

        return output
    }

}
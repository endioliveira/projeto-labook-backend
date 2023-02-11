import { User } from "../models/User"
import { UserDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    static TABLE_USERS = "users"

    private async checkUser(id?: string | undefined, name?: string, email?: string, password?: string, role?: string): Promise<void> {
        if (id) {
            const [usersDB]: UserDB[] = await BaseDatabase.connection(
                UserDatabase.TABLE_USERS
            ).where({ id: id })
            if (usersDB) {
                throw new Error(" Esse 'id' já está cadastrado!")
            }
        }
        if (name) {
            const [usersDB]: UserDB[] = await BaseDatabase.connection(
              UserDatabase.TABLE_USERS
            ).where({ name: name })
            if (usersDB) {
              throw new Error("Esse 'name' já está cadastrado!")
            }
          }
          if (email) {
            const [usersDB]: UserDB[] = await BaseDatabase.connection(
              UserDatabase.TABLE_USERS
            ).where({ email: email })
            if (usersDB) {
              throw new Error("Esse 'email' já está cadastrado!")
            }
          }
    }

  async insertUser(parameter: User): Promise <void> {
    await this.checkUser(
      parameter.getId() as string,
      parameter.getName() as string,
      parameter.getEmail() as string
    )

    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(parameter)
  }

  async findUser(parameter: string | undefined): Promise <UserDB[]> {
    let result

    if (parameter) {
      const usersDB: UserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      ).where("name", "LIKE", `%${parameter}%`)

      result = usersDB
    } else {
      const usersDB: UserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      )
      result = usersDB
    }

    return result
  }

  async findUserById(parameter: string): Promise <UserDB | undefined> {
    const [userDB]: UserDB[] | undefined[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ id: parameter })

    return userDB
  }
}
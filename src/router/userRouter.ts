import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../database/UserDatabase";
import { UserDTO } from "../dtos/UserDTO";

export const userRouter = express.Router() // criação do router de users

const userController = new UserController(
    new UserDTO(),
    new UserBusiness(
        new UserDatabase(),
        new UserDTO()
    )
)

userRouter.post("/", userController.signup)
userRouter.get("/login", userController.login)
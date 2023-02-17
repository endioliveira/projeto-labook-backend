import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
import { BaseError } from "../errors/BaseError"
import { CreatePostInputDTO, GetPostsInputDTO } from "../dtos/PostDTO"

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ) { }

    getPosts = async (req: Request, res: Response) => {
        try {
            const input: GetPostsInputDTO = {
                token: req.headers.authorization
            }

            const output = await this.postBusiness.getPosts(input)

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

    createPost = async (req: Request, res: Response) => {
        try {

            const input: CreatePostInputDTO = {
                token: req.headers.authorization,
                content: req.body.content
            }

            await this.postBusiness.createPost(input)

            res.status(201).end()

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    editPost = async (req: Request, res: Response) => {
        try {
            const input = {
                idEdit: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            }

            await this.postBusiness.editPost(input)

            res.status(200).end()

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    //   deletePost = async (req: Request, res: Response) => {
    //     try {
    //       // const { id } = req.params
    //       const input = {
    //         id: req.params.id
    //       }
    //       const output = await this.postBusiness.deletePost(input)

    //       res.status(200).send({ output: "Post deletado com sucesso!" })

    //     } catch (error) {
    //       console.log(error)

    //       if (error instanceof BaseError) {
    //         res.status(error.statusCode).send(error.message) 
    //       } else {
    //         res.status(500).send("Erro inesperado")
    //       }
    //     }
    //   }

    // likeDislikePost = async (req: Request, res: Response) => {
    //   try {
    //     // const post_id = req.params.id
    //     // const { user_id, like } = req.body as LikeDislikeDB

    //     // const input = { 
    //     // user_id: req.body.user_id,
    //     // post_id: req.params.id,
    //     // like: req.body.like
    //     // }

    //     // const likeDislikeDBInstance = new LikeDislikeDatabase()

    //     // const newLikeDislike = new LikeDislike(
    //     //   user_id,
    //     //   post_id,
    //     //   like
    //     // )

    //     // const newLikeDislikeDB: LikeDislikeDB = {
    //     //   user_id: newLikeDislike.getUserId(),
    //     //   post_id: newLikeDislike.getPostId(),
    //     //   like: newLikeDislike.getLike()
    //     // }

    //     // const getLike = await likeDislikeDBInstance.findLikeDislikeByUserIdPostId(newLikeDislike)

    //     // await likeDislikeDBInstance.insertLikeDislike(newLikeDislike)


    //     const output = await this.postBusiness.deletePost(input)


    //   } catch (error) {
    //     console.log(error)

    //     if (error instanceof BaseError) {
    //       res.status(error.statusCode).send(error.message) 
    //     } else {
    //       res.status(500).send("Erro inesperado")
    //     }
    //   }
    // }
}

import { Request, Response } from "express"
import { PostDatabase } from "../database/PostDatabase"
import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase"
import { Post } from "../models/Post"
import { LikeDislike } from "../models/LikeDislike"
import { PostDB, UpdatePostDB, LikeDislikeDB } from "../types"
import { PostBusiness } from "../business/PostBusiness"
import { BaseError } from "../errors/BaseError"

export class PostController {
  constructor(
    private postBusiness: PostBusiness
  ) {}
  getPosts = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined

      const output = await this.postBusiness.getPosts(q)
      
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

      // const { id, creator_id, content, likes, dislikes, } = req.body as PostDB
     
      const input = {
        id: req.body.id,
        creator_id: req.body.creator_id,
        content: req.body.content,
        likes: req.body.likes,
        dislikes: req.body.dislikes
      }


      const output = await this.postBusiness.createPost(input)

      res.status(201).send({ "content": output })

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
      // const id = req.params.id
      // const { content } = req.body as UpdatePostDB

      const input = {
        id: req.params.id,
        content: req.body.content
      }
      

      const output = await this.postBusiness.editPost(input)

      res.status(201).send( output)

    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message) 
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  deletePost = async (req: Request, res: Response) => {
    try {
      // const { id } = req.params
      const input = {
        id: req.params.id
      }


      const output = await this.postBusiness.deletePost(input)
      
      res.status(200).send({ output: "Post deletado com sucesso!" })

    } catch (error) {
      console.log(error)

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message) 
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  likeDislikePost = async (req: Request, res: Response) => {
    try {
      const post_id = req.params.id
      const { user_id, like } = req.body as LikeDislikeDB
      const likeDislikeDBInstance = new LikeDislikeDatabase()

      if (user_id !== undefined) {
        if (typeof user_id !== "string") {
          res.status(400)
          throw new Error("O 'id' deve ser string")
        }
      }

      if (post_id !== undefined) {
        if (typeof post_id !== "string") {
          res.status(400)
          throw new Error("O 'id' deve ser string")
        }
      }

      if (like !== undefined) {
        if (typeof like !== "number") {
          res.status(400)
          throw new Error("O 'like' deve ser number")
        }
      }

      const newLikeDislike = new LikeDislike(
        user_id,
        post_id,
        like
      )

      const newLikeDislikeDB: LikeDislikeDB = {
        user_id: newLikeDislike.getUserId(),
        post_id: newLikeDislike.getPostId(),
        like: newLikeDislike.getLike()
      }

      const getLike = await likeDislikeDBInstance.findLikeDislikeByUserIdPostId(newLikeDislike)

      // await likeDislikeDBInstance.insertLikeDislike(newLikeDislike)


      res.status(200).send(getLike)


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

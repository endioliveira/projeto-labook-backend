import { Request, Response } from "express"
import { PostDatabase } from "../database/PostDatabase"
import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase"
import { Post } from "../models/Post"
import { LikeDislike } from "../models/LikeDislike"
import { PostDB, UpdatePostDB, LikeDislikeDB } from "../types"

export class PostController {
  getPosts = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined

      const postsDB: PostDB[] = await new PostDatabase().findPost(q)

      const posts: Post[] = postsDB.map(
        (postDB) =>
          new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
          )
      )

      res.status(200).send(posts)
    } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
      }
    }
  }


  createPost = async (req: Request, res: Response) => {
    try {
      const { id, creator_id, content, likes, dislikes, } = req.body as PostDB
      const postDBInstance = new PostDatabase()

      if (id !== undefined) {
        if (typeof id !== "string") {
          res.status(400)
          throw new Error("O 'id' deve ser string")
        }
      }

      if (creator_id !== undefined) {
        if (typeof creator_id !== "string") {
          res.status(400)
          throw new Error("O 'creator_id' deve ser string")
        }
      }

      if (content !== undefined) {
        if (typeof content !== "string") {
          res.status(400)
          throw new Error("O 'content' deve ser string")
        }
      }

      if (likes !== undefined) {
        if (typeof likes !== "number") {
          res.status(400)
          throw new Error("O 'likes' deve ser number")
        }
      }

      if (dislikes !== undefined) {
        if (typeof dislikes !== "number") {
          res.status(400)
          throw new Error("O 'dislikes' deve ser number")
        }
      }

      const newPost = new Post(
        id,
        creator_id,
        content,
        likes,
        dislikes,
        new Date().toISOString(),
        new Date().toISOString()
      )

      const newPostDB: PostDB = {
        id: newPost.getId(),
        creator_id: newPost.getCreatorId(),
        content: newPost.getContent(),
        likes: newPost.getLikes(),
        dislikes: newPost.getDislikes(),
        created_at: newPost.getCreatedAt(),
        updated_at: newPost.getUpdatedAt(),
      }

      await postDBInstance.insertPost(newPost)

      res.status(201).send({ "content": content })

    } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
      }
    }
  }

  editPost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id
      const { content } = req.body as UpdatePostDB
      const postInstance = new PostDatabase()

      if (id !== undefined) {
        if (typeof id !== "string") {
          res.status(400)
          throw new Error("'id' deve ser string")
        }
      }

      const postExist: PostDB | undefined = await postInstance.findPostById(id)

      if (!postExist) {
        res.status(404)
        throw new Error("'id' não encontrado")
      }

      if (content !== undefined) {
        if (typeof content !== "string") {
          res.status(400)
          throw new Error("'content' deve ser string")
        }
      }

      const updatePost = new Post(
        postExist.id,
        postExist.creator_id,
        postExist.content,
        postExist.likes,
        postExist.dislikes,
        new Date().toISOString(),
        new Date().toISOString()
      )


      content && updatePost.setContent(content)

      await postInstance.updatePost({ id, content } as PostDB)

      res.status(201).send({ "content": content })

    } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
      }
    }
  }

  deletePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const postInstance = new PostDatabase()

      if (id !== undefined) {
        if (typeof id !== "string") {
          res.status(400)
          throw new Error("'id' deve ser string")
        }
      }

      const postExist = await postInstance.findPostById(id)

      if (!postExist) {
        res.status(404)
        throw new Error("'id' não encontrado")
      }

      const deletePost = new Post(
        postExist.id,
        postExist.creator_id,
        postExist.content,
        postExist.likes,
        postExist.dislikes,
        new Date().toISOString(),
        new Date().toISOString()
      )

      await postInstance.deletePost(deletePost)

      res.status(200).send("Post deletado com sucesso!")

    } catch (error) {
      console.log(error)

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
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

      if (req.statusCode === 200) {
        res.status(500)
      }

      if (error instanceof Error) {
        res.send(error.message)
      } else {
        res.send("Erro inesperado")
      }
    }
  }
}

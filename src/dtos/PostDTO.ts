import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"
import { PostModel } from "../types"

export interface GetPostsInputDTO {
    q: unknown
}

export type GetPostsOutputDTO = PostModel[]

export interface createPostInputDTO {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number
}

export interface createPostOutputDTO {
    message: string,
    post: {
        content: string
    }
}

export interface editPostInputDTO {
    id: string,
    content: string,
}

export interface editPostOutputDTO {
    message: string,
    post: {
        content: string
    }
}
export interface deletePostInputDTO {
    id: string,
}

export interface deletePostOutputDTO {
    message: string,
}

export interface likeDislikePostInputDTO {
    user_id: string,
    post_id: string,
    like: number
}

export interface likeDislikePostOutputDTO {
    message: string,
}

export class PostDTO {
    public createPostInput(
        id: unknown,
        creator_id: unknown,
        content: unknown,
        likes: unknown,
        dislikes: unknown
    ): createPostInputDTO {

        // if (id === undefined) throw new BadRequestError("'id' é obrigatório")
        if (typeof id !== "string") throw new BadRequestError("'id' deve ser string")

        // if (creator_id === undefined) throw new BadRequestError("'name' é obrigatório")
        if (typeof creator_id !== "string") throw new BadRequestError("'creator_id ' deve ser string")

        if (content === undefined) throw new BadRequestError("'content' é obrigatório")
        if (typeof content !== "string") throw new BadRequestError("'content' deve ser string")

        // if (likes === undefined) throw new BadRequestError("'likes' é obrigatório")
        if (typeof likes !== "number") throw new BadRequestError("'password' deve ser number")

        // if (dislikes === undefined) throw new BadRequestError("'dislikes' é obrigatório")
        if (typeof dislikes !== "number") throw new BadRequestError("'dislikes' deve ser number")

        const dto: createPostInputDTO = {
            id,
            creator_id,
            content,
            likes,
            dislikes
        }

        return dto
    }

    public createPostOutput(post: Post): createPostOutputDTO {
        const dto: createPostOutputDTO = {
            message: "Post criado com sucesso!",
            post: {
                content: post.getContent()
            }
        }

        return dto
    }

    public editPostInput(
        id: unknown,
        content: unknown
    ): editPostInputDTO {
        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser string")
        }

        const dto: editPostInputDTO = {
            id,
            content
        }

        return dto
    }

    public editPostOutput(post: Post): editPostOutputDTO {
        const dto: editPostOutputDTO = {
            message: "Post editado com sucesso!",
            post: {
                content: post.getContent()
            }
        }

        return dto
    }

    public deletePostInput(
        id: unknown
    ): deletePostInputDTO {

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        const dto: deletePostInputDTO = {
            id
        }

        return dto
    }

    public deletePostOutput(post: Post): deletePostOutputDTO {
        const dto: deletePostOutputDTO = {
            message: "Post deletado com sucesso!",
        }

        return dto
    }

    public likeDislikePost(
        user_id: unknown,
        post_id: unknown,
        like: unknown
    ) {
            if (typeof user_id !== "string") {
              throw new BadRequestError("O 'id' deve ser string")
            }
    
            if (typeof post_id !== "string") {
              throw new BadRequestError("O 'id' deve ser string")
            }
    
            if (typeof like !== "number") {
              throw new BadRequestError("O 'like' deve ser number")
            }

          const dto: likeDislikePostInputDTO = {
            user_id,
            post_id,
            like
        }

        return dto
    }


}
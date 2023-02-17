import { PostDatabase } from "../database/PostDatabase";
import { Post } from "../models/Post"
import { BadRequestError } from '../errors/BadRequestError'
import { CreatePostInputDTO, EditPostInputDTO, GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/PostDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { PostCreatorsDB, PostDB } from "../types";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager

    ) { }

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input

        if (token === undefined) {
            throw new BadRequestError("Insira o 'token'")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("O 'token' não é válido!")
        }

        const postsCreatorsDB: PostCreatorsDB[] = await this.postDatabase.getPostsCreators()

        const posts = postsCreatorsDB.map((postCreatorDB) => {
            const post = new Post(
                postCreatorDB.id,
                postCreatorDB.content,
                postCreatorDB.likes,
                postCreatorDB.dislikes,
                postCreatorDB.created_at,
                postCreatorDB.updated_at,
                postCreatorDB.creator_id,
                postCreatorDB.name
            )

            return post.toBusinessModel()
        })

        const output: GetPostsOutputDTO = posts

        return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<void> => {

        const { token, content } = input

        if (token === undefined) {
            throw new BadRequestError("Insira o 'token'")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("O 'token' não é válido!")
        }

        if(typeof content !== "string") {
            throw new BadRequestError("O 'content' deve ser string!")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()
        const creatorId = payload.id
        const name = payload.name

        const post = new Post(
            id,
            content,
            0,
            0,
            createdAt,
            updatedAt,
            creatorId,
            name
        )

        const postDB = post.toDBModel()

        await this.postDatabase.insertPost(postDB)
    }

    public editPost = async (input: EditPostInputDTO): Promise<void> => {
        const { idEdit, content, token } = input

        if (token === undefined) {
            throw new BadRequestError("Insira o 'token'")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("O 'token' não é válido!")
        }

        if(typeof content !== "string") {
            throw new BadRequestError("O 'content' deve ser string!")
        }

        const postExist = await this.postDatabase.findPostById(idEdit)

        if (!postExist) {
            throw new BadRequestError("O 'id' não foi encontrado!")
        }
        
        const creatorId = payload.id

        if(postExist.creator_id !== creatorId) {
            throw new BadRequestError("Apenas quem criou o Post pode editar!")
        }

        const name = payload.name

        const post = new Post(
            postExist.id,
            postExist.content,
            postExist.likes,
            postExist.dislikes,
            postExist.created_at,
            postExist.updated_at,
            creatorId,
            name
        )

        post.setContent(content)
        post.setUpdatedAt(new Date().toISOString())

        const updatedPostDB = post.toDBModel()

        await this.postDatabase.updatePost(idEdit, updatedPostDB)

    }


    // public deletePost = async (input: deletePostInputDTO): Promise <deletePostOutputDTO> => {

    //     const { id } = input

    //     const postExist = await this.postDBInstance.findPostById(id)

    //     if (!postExist) {
    //         throw new BadRequestError("'id' não encontrado")
    //     }

    //     const deletePost = new Post(
    //         postExist.id,
    //         postExist.creator_id,
    //         postExist.content,
    //         postExist.likes,
    //         postExist.dislikes,
    //         new Date().toISOString(),
    //         new Date().toISOString()
    //     )

    //     await this.postDBInstance.deletePost(deletePost)

    //     const output = this.postDTO.deletePostOutput(deletePost)

    //     return output
    // }

}
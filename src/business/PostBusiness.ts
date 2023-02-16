// import { PostDatabase } from "../database/PostDatabase";
// import { Post } from "../models/Post"
// import { LikeDislikeDB, PostDB } from "../types"
// import { BadRequestError } from '../errors/BadRequestError'
// import { createPostInputDTO, PostDTO, createPostOutputDTO, editPostInputDTO, editPostOutputDTO, deletePostInputDTO, deletePostOutputDTO, GetPostsOutputDTO } from "../dtos/PostDTO";
// import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase";
// import { LikeDislike } from "../models/LikeDislike";
// import { IdGenerator } from "../services/IdGenerator";
// import { TokenManager, TokenPayload } from "../services/TokenManager";

// export class PostBusiness {
//     constructor(
//         private postDBInstance: PostDatabase,
//         private postDTO: PostDTO,
//         private idGenerator: IdGenerator,
//         private tokenManager: TokenManager

//     ){}
//     public getPosts = async (q: string | undefined) => {
        
//         const postsDB: PostDB[] = await new PostDatabase().findPost(q)

//         const posts: Post[] = postsDB.map(
//             (postDB) =>
//                 new Post(
//                     postDB.id,
//                     postDB.creator_id,
//                     postDB.content,
//                     postDB.likes,
//                     postDB.dislikes,
//                     postDB.created_at,
//                     postDB.updated_at
//                 )
//         )

//         const output = posts

//         return output
//     }

//     public createPost = async (input: createPostInputDTO) => {

//         const { id ,creator_id, content, likes, dislikes } = input

//         // const id = this.idGenerator.generate()
        
//         const newPost = new Post(
//             id,
//             creator_id,
//             content,
//             likes,
//             dislikes,
//             new Date().toISOString(),
//             new Date().toISOString()
//         )

//         const newPostDB: PostDB = {
//             id: newPost.getId(),
//             creator_id: newPost.getCreatorId(),
//             content: newPost.getContent(),
//             likes: newPost.getLikes(),
//             dislikes: newPost.getDislikes(),
//             created_at: newPost.getCreatedAt(),
//             updated_at: newPost.getUpdatedAt(),
//         }

//         await this.postDBInstance.insertPost(newPost)


//         const output = this.postDTO.createPostOutput(newPost)

//         // const output = {
//         //     message: "Post realizado com sucesso!",
//         //     post: {
//         //         content
//         //     }
//         // }

//         return output
//     }

//     public editPost = async (input: editPostInputDTO): Promise<editPostOutputDTO> => {
//         const { id, content } = input

//         // const id = this.idGenerator.generate()

//         const postExist: PostDB | undefined = await this.postDBInstance.findPostById(id)

//         if (!postExist) {
//             throw new BadRequestError("'id' não encontrado")
//         }

//         const updatePost = new Post(
//             postExist.id,
//             postExist.creator_id,
//             postExist.content,
//             postExist.likes,
//             postExist.dislikes,
//             new Date().toISOString(),
//             new Date().toISOString()
//         )

//         content && updatePost.setContent(content)

//         await this.postDBInstance.updatePost({ id, content } as PostDB)

//         const output = this.postDTO.editPostOutput(updatePost)

//         return output
//     }


//     public deletePost = async (input: deletePostInputDTO): Promise <deletePostOutputDTO> => {

//         const { id } = input

//         const postExist = await this.postDBInstance.findPostById(id)

//         if (!postExist) {
//             throw new BadRequestError("'id' não encontrado")
//         }

//         const deletePost = new Post(
//             postExist.id,
//             postExist.creator_id,
//             postExist.content,
//             postExist.likes,
//             postExist.dislikes,
//             new Date().toISOString(),
//             new Date().toISOString()
//         )

//         await this.postDBInstance.deletePost(deletePost)

//         const output = this.postDTO.deletePostOutput(deletePost)

//         return output
//     }

//     // public likeDislikePost = async(req: Request, res: Response) => {

//     //     const likeDislikeDBInstance = new LikeDislikeDatabase()

//     //   const newLikeDislike = new LikeDislike(
//     //     user_id,
//     //     post_id,
//     //     like
//     //   )

//     //   const newLikeDislikeDB: LikeDislikeDB = {
//     //     user_id: newLikeDislike.getUserId(),
//     //     post_id: newLikeDislike.getPostId(),
//     //     like: newLikeDislike.getLike()
//     //   }

//     //   const getLike = await likeDislikeDBInstance.findLikeDislikeByUserIdPostId(newLikeDislike)

// }
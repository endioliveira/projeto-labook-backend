import { Post } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase"
import { PostDB } from "../types"


export class PostDatabase extends BaseDatabase {
    static TABLE_POSTS = "posts"

    private async checkPost(
      id?: string | undefined,
      creator_id?: string,
      content?: string,
      likes?: number,
      dislikes?: number,
      created_at?: string,
      updated_at?: string
    ): Promise <void> {

      if (id) {
        const [postsDB]: PostDB[] = await BaseDatabase.connection(
          PostDatabase.TABLE_POSTS
        ).where({ id: id })
        if (postsDB) {
          throw new Error("'id' já cadastrado.")
        }
      }

    }

    async insertPost(parameter: Post): Promise <void> {

      await this.checkPost(
        parameter.getId() as string,
        parameter.getCreatorId() as string,
        parameter.getContent() as string,
        parameter.getLikes() as number,
        parameter.getDislikes() as number,
        parameter.getCreatedAt() as string,
        parameter.getUpdatedAt() as string,
      )

      await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(parameter)
    }

    async findPost(parameter: string | undefined): Promise <PostDB[]> {
      let result
  
      if (parameter) {
        const postsDB: PostDB[] = await BaseDatabase.connection(
          PostDatabase.TABLE_POSTS
        ).where("content", "LIKE", `%${parameter}%`)
  
        result = postsDB
      } else {
        const postsDB: PostDB[] = await BaseDatabase.connection(
          PostDatabase.TABLE_POSTS
        )
        result = postsDB
      }
  
      return result
    }

    async findPostById(parameter: string): Promise <PostDB | undefined> {
      const [postDB]: PostDB[] | undefined[] = await BaseDatabase.connection(
        PostDatabase.TABLE_POSTS
      ).where({ id: parameter })
  
      return postDB
    }
  
    async updatePost({id, content }:PostDB):Promise<void> {

      await this.checkPost(
        content
      )
  
      await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .update({ content })
        .where({id})
    }
  
    async deletePost(parameter: Post) :Promise<void> {
      await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .delete()
        .where({ id: parameter.getId() })
    }
  }
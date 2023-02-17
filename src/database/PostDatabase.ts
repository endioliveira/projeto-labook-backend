import { Post } from "../models/Post"
import { PostDB, PostCreatorsDB } from "../types"
import { BaseDatabase } from "./BaseDatabase"

export class PostDatabase extends BaseDatabase {
  static TABLE_POSTS = "posts"

  public async getPostsCreators() {
    const result: PostCreatorsDB[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .select(
        "posts.id",
        "posts.creator_id",
        "posts.content",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "posts.updated_at",
        "users.name"
      )
      .join("users", "posts.creator_id", "=", "users.id")

    return result
  }

  public async insertPost(newPostDB: PostDB): Promise<void> {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(newPostDB)
  }

  public async findPostById(id: string) {
    const [postDB]: PostDB[] | undefined[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ id })

    return postDB
  }

  public async updatePost(id: string, postDB: PostDB): Promise<void> {
     await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
     .update(postDB)
     .where({ id }) 

  }

}
import { LikeDislike } from "../models/LikeDislike";
import { BaseDatabase } from "./BaseDatabase"
import { LikeDislikeDB } from "../types"


export class LikeDislikeDatabase extends BaseDatabase {
    static TABLE_LIKE_DISLIKES = "likes_dislikes"

    async findLikeDislikeByUserIdPostId(parameter: LikeDislike): Promise <LikeDislikeDB | undefined> {
      const [likeDislikeDB]: LikeDislikeDB[] | undefined[] = await BaseDatabase.connection(
        LikeDislikeDatabase.TABLE_LIKE_DISLIKES
      ).where({ user_id: parameter.getUserId, post_id: parameter.getPostId})
  
      return likeDislikeDB
    }

    async insertLikeDislike(parameter: LikeDislike): Promise <void> {

      // await this.checkPost(
      //   parameter.getUserId() as string,
      //   parameter.getPostId() as string,
      //   parameter.getLikes() as number,
      // )

      await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKES).insert(parameter)
    }

    

  }
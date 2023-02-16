export enum ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

// export interface TokenPayload {
//     id: string,
// 	name: string,
//     role: ROLES
// }

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: ROLES,
    created_at: string 
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: ROLES,
    createdAt: string //trocar pra createdAt
}

export interface PostDB {
    id: string, 
    creator_id: string,
    content: string, 
    likes: number,
    dislikes: number,
    created_at: string, 
    updated_at: string 
}

export interface PostModel {
    id: string,
    // creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string, //trocar pra createdAt
    updatedAt: string, //trocar pra updatedAt
    creator: {
        id: string
        name: string
    }
}

export interface likeDislikeDB {
    user_id: string,
    post_id: string,
    like: boolean
}

export interface UpdatePostDB {
    content: string
}

export interface LikeDislikeDB {
    user_id: string,
    post_id: string,
    like: number
}
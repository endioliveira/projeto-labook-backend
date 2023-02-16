import { PostDB, PostModel } from "../types"

export class Post {
    constructor(
        private id: string,
        private creator_id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private created_at: string,
        private updated_at: string,
    ) {}

    getId(): string {
        return this.id
    }

    setId(value: string): void {
        this.id = value
    }

    getCreatorId(): string {
        return this.creator_id
    }

    setCreatorId(value: string): void {
        this.creator_id = value
    }

    getContent(): string {
        return this.content
    }

    setContent(value: string): void {
        this.content = value
    }

    getLikes(): number {
        return this.likes
    }

    setLikes(value: number): void {
        this.likes = value
    }

    getDislikes(): number {
        return this.dislikes
    }

    seDislikes(value: number): void {
        this.dislikes = value
    }

    getCreatedAt(): string {
        return this.created_at
    }

    setCreatedAt(value: string): void {
        this.created_at = value
    }

    getUpdatedAt(): string {
        return this.updated_at
    }

    setUpdatedAt(value: string): void {
        this.updated_at = value
    }

    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creator_id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            creator_id: this.creator_id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }
}
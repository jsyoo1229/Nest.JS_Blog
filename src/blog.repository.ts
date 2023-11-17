import { readFile, writeFile } from "fs/promises";
import { PostDto } from "./blog.model";
import { Injectable } from "@nestjs/common";

export interface BlogRepository {
    getAllPost(): Promise<PostDto[]>;
    createPost(postDto: PostDto);
    getPost(id: String): Promise<PostDto>;
    deletePost(id: String);
    updatePost(id: String, postDto: PostDto);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
    File_Name = './src/blog.data.json';

    async getAllPost(): Promise<PostDto[]> {
        const datas = await readFile(this.File_Name, 'utf-8');
        const posts = JSON.parse(datas);
        return posts;
    }

    async createPost(postDto: PostDto) {
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = {id: id.toString(), ...postDto, createdDt: new Date()};
        posts.push(createPost);
        await writeFile(this.File_Name, JSON.stringify(posts));
    }

    async getPost(id: String): Promise<PostDto> {
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);
        return result;
    }

    async deletePost(id: String) {
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await writeFile(this.File_Name, JSON.stringify(filteredPosts));
    }

    async updatePost(id: String, postDto: PostDto) {
        const posts = await this.getAllPost();
        const updatePost = {id, ...postDto, updateDt: new Date()};
        const index = posts.findIndex((post) => post.id === id);
        posts[index] = updatePost;
        await writeFile(this.File_Name, JSON.stringify(posts));
    }
}
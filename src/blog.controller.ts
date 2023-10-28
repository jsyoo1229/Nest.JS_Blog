import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog')
export class BlogController{
    blogService: BlogService;

    constructor(){
        this.blogService = new BlogService();
    }

    @Get()
    getAllPosts(){
        console.log('모든 게시글 가져오기');
        return this.blogService.getAllPosts();
    }

    @Post()
    CreatePost(@Body() postDto){
        console.log('게시글 작성');
        this.blogService.createPost(postDto);
        return '게시글 작성 완료';
    }

    @Get('/:id')
    getPost(@Param('id') id: string){
        console.log(`[id: ${id}게시글 하나 가져오기]`);
        return this.blogService.getPost(id);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: string){
        console.log('게시글 삭제');
        this.blogService.delete(id);
        return '게시글 삭제 완료';
    }

    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() postDto){
        console.log(`[게시글 업데이트] id: ${id}, 내용: ${postDto}`);
        return this.blogService.updatePost(id, postDto);
    }

}
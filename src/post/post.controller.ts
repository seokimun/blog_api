import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async createPost(
        @Body() createPostDto: CreatePostDto,
    ): Promise<PostEntity> {
        const createPost = this.postService.createPost(createPostDto);
        return createPost;
    }

    @Put(':id')
    async updatePost(
        @Param('id') id: number,
        @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        const updatePost = this.postService.updatePost(id, updatePostDto);
        return updatePost;
    }

    @Delete(':id')
    async deletePost(@Param('id') id: number): Promise<PostEntity> {
        const deletePost = this.postService.deletePost(id);
        return deletePost;
    }

    @Get()
    async findAllPost(): Promise<PostEntity[]> {
        const findAllPost = this.postService.findAllPost();
        return findAllPost;
    }

    @Get(':id')
    async findOnePost(id: number): Promise<PostEntity> {
        const findOnePost = this.postService.findOnePost(id);
        return findOnePost;
    }
}

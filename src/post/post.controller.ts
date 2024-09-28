import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createPost(
        @Body() createPostDto: CreatePostDto,
        @Request() req: any,
    ) {
        const userId = req.user.userId;
        return this.postService.createPost(createPostDto, userId);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePostDto: UpdatePostDto,
        @Request() req: any,
    ) {
        const userId = req.user.userId;
        return this.postService.updatePost(id, updatePostDto, userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deletePost(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: any,
    ) {
        const userId = req.user.userId;
        return this.postService.deletePost(id, userId);
    }

    @Get()
    async findAllPost(): Promise<PostEntity[]> {
        const findAllPost = this.postService.findAllPost();
        return findAllPost;
    }

    @Get(':id')
    async findOnePost(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<PostEntity> {
        const findOnePost = this.postService.findOnePost(id);
        return findOnePost;
    }
}

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
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = this.postService.createPost(createPostDto);
    return post;
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    const post = this.postService.updatePost(id, updatePostDto);
    return post;
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<PostEntity> {
    const post = this.postService.deletePost(id);
    return post;
  }

  @Get()
  async findAllPost(): Promise<PostEntity[]> {
    const post = this.postService.findAllPost();
    return post;
  }

  @Get(':id')
  async findOnePost(id: number): Promise<PostEntity> {
    const post = this.postService.findOnePost(id);
    return post;
  }
}

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = await this.postService.createPost(createPostDto);
    return post;
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() updatePost: UpdatePostDto,
  ): Promise<PostEntity> {
    const post = await this.postService.updatePost(id, updatePost);
    return post;
  }
}

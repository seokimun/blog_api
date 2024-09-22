import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UpdatePostDto } from './dto/UpdatePost.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ) {}

    async createPost(
        createPostDto: CreatePostDto,
        userId: number,
    ): Promise<PostEntity> {
        const createPost = await this.postRepository.create({
            ...createPostDto,
            userId,
        });
        return this.postRepository.save(createPost);
    }

    async updatePost(
        id: number,
        updatePostDto: UpdatePostDto,
        userId: number,
    ): Promise<PostEntity> {
        const post = await this.postRepository.findOneBy({ id });

        if (!post) {
            throw new UnauthorizedException('게시글을 찾을 수 없습니다.');
        }

        if (post.userId !== userId) {
            throw new UnauthorizedException('권한이 없습니다.');
        }

        await this.postRepository.update(id, updatePostDto);
        return this.postRepository.findOneBy({ id });
    }

    async deletePost(id: number): Promise<PostEntity> {
        const deletePost = await this.postRepository.findOneBy({ id });
        this.postRepository.softDelete({ id });
        return deletePost;
    }

    async findAllPost(): Promise<PostEntity[]> {
        return this.postRepository.find({
            withDeleted: true,
        });
    }

    async findOnePost(id: number): Promise<PostEntity> {
        return this.postRepository.findOneBy({ id });
    }
}

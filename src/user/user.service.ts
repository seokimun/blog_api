import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto, userId: number) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
        }

        if (user.id !== userId) {
            throw new UnauthorizedException('수정권한이 없습니다.');
        }

        await this.userRepository.update(id, updateUserDto);
        return this.userRepository.findOneBy({ id });
    }

    async deleteUser(id: number, userId: number) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
        }

        if (user.id !== userId) {
            throw new UnauthorizedException('삭제권한이 없습니다.');
        }

        await this.userRepository.delete({ id });
    }

    async findAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find({
            withDeleted: true,
        });
    }

    async findOneByUser(id: number): Promise<UserEntity> {
        return this.userRepository.findOneBy({ id });
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { email } });
    }
}

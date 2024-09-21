import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const createUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(createUser);
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

    async deleteUser(id: number): Promise<UserEntity> {
        const deleteUser = await this.userRepository.findOneBy({ id });
        this.userRepository.softDelete({ id });
        return deleteUser;
    }
}

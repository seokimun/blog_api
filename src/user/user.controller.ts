import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserEntity } from '../entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserEntity> {
        const createUser = this.userService.createUser(createUserDto);
        return createUser;
    }

    @Get()
    async findAllUser(): Promise<UserEntity[]> {
        const findAllUser = this.userService.findAllUser();
        return findAllUser;
    }

    @Get(':id')
    async findOneByUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<UserEntity> {
        const findOneByUser = this.userService.findOneByUser(id);
        return findOneByUser;
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<UserEntity> {
        const deleteUser = this.userService.deleteUser(id);
        return deleteUser;
    }
}

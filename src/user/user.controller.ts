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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';

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

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Request() req: any,
    ) {
        const userId = req.user.userId;
        return this.userService.updateUser(id, updateUserDto, userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
        @Request() req: any,
    ) {
        const userId = req.user.userId;
        return this.userService.deleteUser(id, userId);
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
}

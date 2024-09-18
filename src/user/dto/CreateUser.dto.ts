import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, { message: 'email형식으로 입력하시오' })
    email: string;

    @IsString({
        message: 'password를 string형식으로 입력하시오',
    })
    password: string;

    @IsString({
        message: '이름을 string형식으로 입력하시오',
    })
    name: string;
}

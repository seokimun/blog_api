import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'email형식으로 입력하시오' })
    email: string;

    @IsNotEmpty() //
    @IsString({
        message: 'password를 string형식으로 입력하시오',
    })
    password: string;

    @IsNotEmpty()
    @IsString({
        message: '이름을 string형식으로 입력하시오',
    })
    name: string;
}

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
    @IsEmail({}, { message: 'email형식으로 입력하시오' })
    @IsNotEmpty()
    email: string;

    @IsString({
        message: 'password를 string형식으로 입력하시오',
    })
    @IsNotEmpty()
    password: string;
}

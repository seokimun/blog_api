import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @IsString({
        message: 'title을 string 타입으로 입력하시오',
    })
    title: string;

    @IsString({
        message: 'descripton을 string 타입으로 입력하시오',
    })
    description: string;
}

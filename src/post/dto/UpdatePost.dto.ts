import { IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

import { IsNotEmpty } from 'class-validator';

export class ViewPostDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}

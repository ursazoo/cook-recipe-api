import { IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class EditPostDto extends CreatePostDto {
  @IsNotEmpty({ message: 'id不能为空' })
  id: number;
}

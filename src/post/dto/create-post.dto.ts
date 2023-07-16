import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: '标题不能为空' })
  title: string;
  @IsNotEmpty({ message: '是否发布不能为空' })
  published: boolean;
  content?: string;
  @IsNotEmpty({ message: '作者不能为空' })
  authorId: number;
  @IsNotEmpty({ message: '基础材料不能为空' })
  baseMaterialIds: number[];
  @IsNotEmpty({ message: '厨具不能为空' })
  cookwareIds: number[];
}

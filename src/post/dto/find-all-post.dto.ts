import { IsNotEmpty } from 'class-validator';

export class FindAllPostDto {
  @IsNotEmpty({ message: 'pageNum不能为空' })
  pageNum: number;
  @IsNotEmpty({ message: 'pageSize不可为空' })
  pageSize: number;
  title?: string;
  baseMaterialIds?: string[];
  cookwareIds?: string;
  authorId?: string;
}

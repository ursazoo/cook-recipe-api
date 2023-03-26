import { IsNotEmpty } from 'class-validator';

export class FindAllUserDto {
  @IsNotEmpty({ message: 'pageNum不能为空' })
  pageNum: number;
  @IsNotEmpty({ message: 'pageSize不可为空' })
  pageSize: number;
  name?: string;
  id?: string;
  account?: string;
  email?: string;
  mobile?: string;
}

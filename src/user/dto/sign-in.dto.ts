import { IsNotEmpty } from 'class-validator';

export class SigninDTO {
  @IsNotEmpty({ message: '账号不能为空' })
  readonly account: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

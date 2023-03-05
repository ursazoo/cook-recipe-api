import { IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: '账号不能为空' })
  readonly account: string;
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly name: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '确认密码不能为空' })
  readonly repeatPassword: string;
}

export class LoginDTO {
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly account: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

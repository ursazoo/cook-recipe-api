import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { LoginDTO, RegisterDTO } from './user.dto'; // 引入 DTO
import { AuthService } from '../common/auth/auto.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get(':id')
  findUser(@Param() param: { id: number }) {
    return this.userService.findUser({ id: param.id });
  }

  @Post('register')
  registerUser(@Body() body: RegisterDTO) {
    return this.userService.createUser(body);
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      body.account,
      body.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  async updateUser(@Body() body: any) {
    return this.userService.updateUser(body);
  }
}
